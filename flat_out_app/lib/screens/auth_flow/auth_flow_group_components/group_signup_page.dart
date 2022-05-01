import 'package:flat_out_app/components/atoms/auth_text_field.dart';
import 'package:flat_out_app/components/molecules/toast_page.dart';
import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_res.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class GroupSignupPage extends ToastWrapper {

  @override
  State<StatefulWidget> createState() => _GroupSignupPageState();
}

class _GroupSignupPageState extends State<GroupSignupPage> {
  final TextEditingController uName = TextEditingController();
  final TextEditingController uiName = TextEditingController();
  final TextEditingController pWord = TextEditingController();
  final TextEditingController pWordCon = TextEditingController();
  bool isLoading = false;

  void signup() async {
    if (pWord.text != pWordCon.text) {
      widget.errorToast("Passwords do not match", context);
    } else {
      try {
        FomRes res = await FomReq.groupRegister(uName.text, pWord.text, context.read<RuntimeCache>().user?.token ?? "");
        if (res.statusCode == 200) {
          widget.successToast(res.msg, context);
          context.read<RuntimeCache>().addGroup(FomGroup.fromJson(res.item));
          context.read<RuntimeCache>().readyCache();
        } else
          widget.errorToast(res.msg, context);
      } catch (_) {
        widget.errorToast("Unable to send request", context);
      }
    }
    setState(() => isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        AuthTextField(
          controller: uName,
          hintText: "Flat Name",
        ),
        AuthTextField(
          onChanged: (_) {
            setState(() {});
          },
          obscureText: true,
          controller: pWord,
          hintText: "Flat Password",
        ),
        AuthTextField(
          onChanged: (_) {
            setState(() {});
          },
          obscureText: true,
          controller: pWordCon,
          hintText: "Confirm Flat Password",
          error: pWord.text != pWordCon.text ? "Mismatched Password" : null,
        ),
        Padding(
          padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 20),
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                shape: StadiumBorder(),
              ),
              onPressed: () {
                setState(() => isLoading = true);
                FocusManager.instance.primaryFocus?.unfocus();
                signup();
              },
              child: isLoading
                  ? SizedBox(
                height: Theme.of(context).textTheme.button?.fontSize,
                width: Theme.of(context).textTheme.button?.fontSize,
                child: CircularProgressIndicator(
                  strokeWidth: (Theme.of(context).textTheme.button?.fontSize ?? 10) / 5,
                  color: Theme.of(context).scaffoldBackgroundColor,
                ),
              )
                  : Text("Signup")),
        )
      ],
    );
  }
}
