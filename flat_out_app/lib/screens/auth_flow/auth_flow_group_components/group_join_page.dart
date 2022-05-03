import 'package:flat_out_app/components/atoms/auth_text_field.dart';
import 'package:flat_out_app/components/molecules/toast_page.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_res.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class GroupJoinPage extends ToastWrapper {
  @override
  State<StatefulWidget> createState() => _GroupJoinPageState();
}

class _GroupJoinPageState extends State<GroupJoinPage> {
  final TextEditingController uName = TextEditingController();
  final TextEditingController pWord = TextEditingController();
  bool isLoading = false;

  void join() async {
    try {
      FomRes res = await FomReq.groupJoin(uName.text, pWord.text, context.read<RuntimeCache>().user!.token);
      if (res.statusCode == 200) {
        await context.read<RuntimeCache>().setUser(FomUser.fromJson(res.item));
        widget.successToast(res.msg, context);
        context.read<RuntimeCache>().addGroup(FomGroup.fromJson(res.item));
        context.read<RuntimeCache>().readyCache();
      } else
        widget.errorToast(res.msg, context);
    } catch (e) {
      widget.fuckMeToast("${e}", context);
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
          obscureText: true,
          controller: pWord,
          hintText: "Flat Password",
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
                join();
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
                  : Text("Join")),
        )
      ],
    );
  }
}
