import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'auth_page.dart';

class GroupPage extends AuthPage {
  final TextEditingController groupNameVal = new TextEditingController();
  final TextEditingController groupPassword = new TextEditingController();
  final TextEditingController groupPassword2 = new TextEditingController();

  @override
  String get title => "Login Page";

  @override
  String get action => "Login";

  @override
  Future<bool> attempt(BuildContext context) {
    // TODO: implement attempt
    throw UnimplementedError();
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    throw UnimplementedError();
  }
}

class GroupPageState extends State<GroupPage> {
  bool _isChecked = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: MediaQuery.of(context).size.height / 20),
      child: Column(
        children: [
          Text(
            "Group",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 35,
            ),
          ),
          CheckboxListTile(
            title: Text("Existing Group",
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: Colors.grey[700],
                  fontSize: 17,
                )),
            value: _isChecked,
            onChanged: (_) {
              setState(() {
                _isChecked = !_isChecked;
              });
            },
          ),
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
          _isChecked
              ? Container()
              : TextField(
                  controller: widget.groupPassword2,
                  obscureText: true,
                  onChanged: (_) {
                    setState(() {});
                  },
                  decoration: InputDecoration(
                      hintText: "Confirm Password",
                      errorText:
                          widget.groupPassword.text != widget.groupPassword2.text ? "Mismatch passwords" : null)),
        ],
      ),
    );
  }
}
