import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/user_auth_header.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/user_auth_page_body.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/user_login_page.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/user_signup_page.dart';
import 'package:flutter/material.dart';

class UserAuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _UserAuthFlowState();
}

class _UserAuthFlowState extends State<UserAuthFlow> {
  String _pageStr = "Login";
  late Widget _loginPage;
  late Widget _signupPage;
  late Widget _curPage;


  @override
  void initState() {
    super.initState();
    _loginPage = UserLoginPage();
    _signupPage = UserSignupPage();
    _curPage = _loginPage;
  }

  void swapPageUser(String p){
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
          UserAuthHeader(curPage: _pageStr,swapPage: swapPageUser),
          Divider(
              thickness: 5,
              indent: MediaQuery.of(context).size.width / 10,
              endIndent: MediaQuery.of(context).size.width / 10),
          UserAuthPageBody(curPage: _curPage),
        ],
      ),
    ),
  );
  }
  
}