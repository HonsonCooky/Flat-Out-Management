import 'package:flutter/material.dart';

import '../../BusinessLogic/http_requests.dart';
import 'auth_page.dart';

class LoginPage extends AuthPage {
  final TextEditingController usernameVal = new TextEditingController();
  final TextEditingController passwordVal = new TextEditingController();

  @override
  String get title => "Login Page";

  @override
  String get action => "Login";

  @override
  Future<bool> attempt(BuildContext context) async {
    var res = await FomReq.userLogin(usernameVal.text, passwordVal.text);
    return false;
  }

  @override
  State<StatefulWidget> createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
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
