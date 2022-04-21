import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'auth_page.dart';

class GroupSignupPage extends AuthPage {
  final TextEditingController groupNameVal = new TextEditingController();
  final TextEditingController groupPassword = new TextEditingController();
  final TextEditingController groupPassword2 = new TextEditingController();

  @override
  Future<bool> attempt(BuildContext context) {
    // TODO: implement attempt
    throw UnimplementedError();
  }

  @override
  State<StatefulWidget> createState() => _GroupSignupPageState();
}

class _GroupSignupPageState extends State<GroupSignupPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          TextField(
            controller: widget.groupNameVal,
            decoration: InputDecoration(
              hintText: "Group name",
            ),
          ),
          TextField(
            controller: widget.groupPassword,
            obscureText: true,
            onChanged: (_) {
              setState(() {});
            },
            decoration: InputDecoration(
              hintText: "Password",
            ),
          ),
          TextField(
              controller: widget.groupPassword2,
              obscureText: true,
              onChanged: (_) {
                setState(() {});
              },
              decoration: InputDecoration(
                  hintText: "Confirm Password",
                  errorText: widget.groupPassword.text != widget.groupPassword2.text ? "Mismatch passwords" : null)),
        ],
      ),
    );
  }
}
