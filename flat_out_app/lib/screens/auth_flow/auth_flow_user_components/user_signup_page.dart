import 'package:flat_out_app/components/molecules/auth_text_confirm_passwords.dart';
import 'package:flat_out_app/components/molecules/auth_text_field.dart';
import 'package:flat_out_app/components/templates/toast_page.dart';
import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/interfaces/fom_res.dart';
import 'package:flat_out_app/core/interfaces/fom_user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UserSignupPage extends ToastWrapper {
  @override
  State<StatefulWidget> createState() => _UserSignupPageState();
}

class _UserSignupPageState extends State<UserSignupPage> {
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
        FomRes res = await fomReq.userRegister(uName.text, uiName.text, pWord.text);
        if (res.statusCode == 200) {
          await context.read<RuntimeCache>().setUser(FomUser.fromJson(res.item));
          widget.successToast(res.msg, context);
        } else
          widget.errorToast(res.msg, context);
      } catch (e) {
        widget.devErrorToast("${e}", context);
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
          hintText: "Username",
        ),
        AuthTextField(
          controller: uiName,
          hintText: "(Optional) Nickname",
        ),
        AuthTextConfirmPasswords(
          onChanged: (_) {
            setState(() {});
          },
          controller: pWord,
          controller2: pWordCon,
          hintText: "Password",
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
