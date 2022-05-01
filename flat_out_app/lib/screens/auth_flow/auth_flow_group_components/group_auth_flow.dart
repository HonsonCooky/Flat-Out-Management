import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_header.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_page_body.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_login_page.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_signup_page.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/no_group_alert.dart';
import 'package:flutter/material.dart';

class GroupAuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _GroupAuthFlow();
}

class _GroupAuthFlow extends State<GroupAuthFlow> {
  String _pageStr = "Login";
  late Widget _loginPage;
  late Widget _signupPage;
  late Widget _curPage;

  @override
  void initState() {
    super.initState();
    _loginPage = GroupLoginPage();
    _signupPage = GroupSignupPage();
    _curPage = _loginPage;
    Future.delayed(Duration.zero, () => NoGroupAlert.showAlertDialog(context));
  }

  void swapPageUser(String p) {
    if (_pageStr == p) return;

    Widget page = _loginPage;
    if (p == "Signup") page = _signupPage;

    setState(() {
      _pageStr = p;
      _curPage = page;
    });
  }

  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        body: Column(
          children: [
            GroupAuthHeader(curPage: _pageStr, swapPage: swapPageUser),
            Divider(
                thickness: 5,
                indent: MediaQuery.of(context).size.width / 10,
                endIndent: MediaQuery.of(context).size.width / 10),
            GroupAuthPageBody(curPage: _curPage),
          ],
        ),
      ),
    );
  }
}
