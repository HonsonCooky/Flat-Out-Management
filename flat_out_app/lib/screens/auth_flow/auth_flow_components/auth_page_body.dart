import 'package:flat_out_app/core/blocs/auth_page_notifier.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_components/signup_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'login_page.dart';

class AuthPageBody extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthPageBodyState();
}

class _AuthPageBodyState extends State<AuthPageBody> {
  Widget loginPage = LoginPage();
  Widget signupPage = SignupPage();

  @override
  Widget build(BuildContext context) {
    AuthPage curPage = Provider.of<AuthPageNotifier>(context, listen: true).currentPage();
    Widget page = curPage == AuthPage.login ? loginPage : signupPage;
    return Expanded(
      child: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: MediaQuery.of(context).size.width / 10,
            vertical: MediaQuery.of(context).size.height / 30,
          ),
          child: page,
        ),
      ),
    );
  }
}
