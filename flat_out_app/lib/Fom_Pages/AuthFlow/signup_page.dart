import 'package:flat_out_app/BusinessLogic/http_requests.dart';
import 'package:flutter/material.dart';

import 'auth_page.dart';

class SignupPage extends AuthPage {
  final TextEditingController usernameVal = new TextEditingController();
  final TextEditingController nicknameVal = new TextEditingController();
  final TextEditingController userPassword = new TextEditingController();
  final TextEditingController userPassword2 = new TextEditingController();
  
  @override
  String get title => "Signup Page";

  @override
  String get action => "Signup";

  @override
  Future<bool> attempt(BuildContext context) async {
    if (userPassword.text != userPassword2.text) {
      print("here");
      errorToast("Some passwords don't match", context);
      return false;
    }

    var uRes = await FomReq.userRegister(usernameVal.text, nicknameVal.text, userPassword.text);
    if (uRes.statusCode == 200) {
      successToast("Successfully registered ${usernameVal.text}", context);
      return true;
    } else {
      errorToast("${uRes.msg}", context);
      return false;
    }
  }

  @override
  State<StatefulWidget> createState() => SignupPageState();
}

class SignupPageState extends State<SignupPage> {
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
            controller: widget.nicknameVal,
            decoration: InputDecoration(
              hintText: "(Optional) Nickname",
            ),
          ),
          TextField(
            controller: widget.userPassword,
            obscureText: true,
            onChanged: (_) {
              setState(() {});
            },
            decoration: InputDecoration(
              hintText: "Password",
            ),
          ),
          TextField(
            controller: widget.userPassword2,
            obscureText: true,
            onChanged: (_) {
              setState(() {});
            },
            decoration: InputDecoration(
                hintText: "Confirm Password",
                errorText: widget.userPassword.text != widget.userPassword2.text ? "Mismatch passwords" : null),
          ),
        ],
      ),
    );
  }
}
