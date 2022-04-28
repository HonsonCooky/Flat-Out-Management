import 'dart:convert';

import 'package:flat_out_app/core/blocs/runtime_cache.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../components/molecules/toast_page.dart';
import '../../../core/blocs/http_requests.dart';
import '../../../core/jsons/fom_res.dart';

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
        print(res.item.toString());
        await context.read<RuntimeCache>().setUser(jsonDecode(res.item.toString()));
        widget.successToast(res.msg, context);
      } else
        widget.errorToast(res.msg, context);
    } catch (e) {
      print(e);
      widget.errorToast("Unable to send request", context);
    }
    setState(() => isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        TextField(
          controller: uName,
          cursorColor: Theme.of(context).primaryColor,
          decoration: InputDecoration(hintText: "Username"),
        ),
        TextField(
          obscureText: true,
          controller: pWord,
          decoration: InputDecoration(hintText: "Password"),
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
