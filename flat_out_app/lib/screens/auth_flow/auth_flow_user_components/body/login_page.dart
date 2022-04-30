import 'package:flat_out_app/components/atoms/auth_text_field.dart';
import 'package:flat_out_app/components/molecules/toast_page.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/jsons/fom_res.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginPage extends ToastPage {
  @override
  State<StatefulWidget> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController uName = TextEditingController();
  final TextEditingController pWord = TextEditingController();
  bool isLoading = false;

  void login() async {
    try {
      FomRes res = await FomReq.userLogin(uName.text, pWord.text);
      if (res.statusCode == 200) {
        await Provider.of<RuntimeCache>(context).setUser(res.item);
        widget.successToast(res.msg, context);
      } else
        widget.errorToast(res.msg, context);
    } catch (_) {
      widget.fuckMeToast("Log001", context);
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
          obscureText: true,
          controller: pWord,
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
                login();
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
                  : Text("Login")),
        )
      ],
    );
  }
}
