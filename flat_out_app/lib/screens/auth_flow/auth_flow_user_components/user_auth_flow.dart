import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/header/user_auth_header.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/body/user_auth_page_body.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/body/login_page.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/body/signup_page.dart';
import 'package:flutter/material.dart';

class UserAuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _UserAuthFlowState();
}

class _UserAuthFlowState extends State<UserAuthFlow> {
  bool _isLoginPage = true;
  late Widget _loginPage;
  late Widget _signupPage;
  late Widget _curPage;


  @override
  void initState() {
    super.initState();
    _loginPage = LoginPage();
    _signupPage = SignupPage(swapPage);
    _curPage = _loginPage;
  }

  void swapPage(bool isLoginPage){
    if (_isLoginPage == isLoginPage) return;
    
    Widget page = _loginPage;
    if (_isLoginPage) page = _signupPage;
    setState(() {
      _isLoginPage = !_isLoginPage;
      _curPage = page;
    });      
  }
  
  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
    child: Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Column(
        children: [
          UserAuthHeader(isLoginPage: _isLoginPage, swapPage: swapPage,),
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