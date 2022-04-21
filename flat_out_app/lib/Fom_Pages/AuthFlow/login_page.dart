import 'package:flat_out_app/BusinessLogic/runtime_cache.dart';
import 'package:flat_out_app/JsonObjects/fom_user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../BusinessLogic/http_requests.dart';
import 'auth_page.dart';

class LoginPage extends AuthPage {
  final TextEditingController usernameVal = new TextEditingController();
  final TextEditingController passwordVal = new TextEditingController();

  @override
  Future<bool> attempt(BuildContext context) async {
    var res = await FomReq.userLogin(usernameVal.text, passwordVal.text);
    if (res.statusCode == 200) {
      successToast(res.msg, context);
      context.read<RuntimeCache>().setUser(FomUser.fromJson(res.item));
      return true;
    }

    errorToast(res.msg, context);
    return false;
  }

  @override
  State<StatefulWidget> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          TextField(
            controller: widget.usernameVal,
            decoration: InputDecoration(
              hintText: "Username",
            ),
          ),
          TextField(
            controller: widget.passwordVal,
            obscureText: true,
            decoration: InputDecoration(
              hintText: "Password",
            ),
          ),
        ],
      ),
    );
  }
}
