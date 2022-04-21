import 'package:flat_out_app/Components/Atoms/loading.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/auth_page.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/group_login_page.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/group_signup_page.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/login_page.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/signup_page.dart';
import 'package:flat_out_app/Fom_Pages/ui_statics.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../BusinessLogic/runtime_cache.dart';
import '../../Components/Atoms/header_large.dart';
import '../../Components/Atoms/unfocus_wrapper.dart';

class AuthRouter extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthRouterState();
}

class _AuthRouterState extends State<AuthRouter> {
  bool _loading = true;

  late AuthPage _curPage;
  List<AuthPage> _pages = [LoginPage(), SignupPage(), GroupLoginPage(), GroupSignupPage()];

  late String _title, _action, _goTo, _toolTip;

  @override
  void initState() {
    super.initState();
    context.read<RuntimeCache>().init().whenComplete(() {
      if (context.read<RuntimeCache>().user != null) {
        setGroupLoginPage();
      } else {
        setLoginPage();
      }
    });
  }

  void setLoginPage() {
    setState(() {
      _loading = false;
      _curPage = _pages[0];
      _title = "User Login";
      _action = "Login";
      _goTo = "Signup";
    });
  }

  void setSignupPage() {
    setState(() {
      _loading = false;
      _curPage = _pages[1];
      _title = "User Signup";
      _action = "Signup";
      _goTo = "Login";
    });
  }

  void setGroupLoginPage() {
    setState(() {
      _loading = false;
      _curPage = _pages[2];
      _title = "Flat Group Login";
      _action = "Login";
      _goTo = "New Group";
    });
  }

  void setGroupSignupPage() {
    print("GROUP");
    setState(() {
      _loading = false;
      _curPage = _pages[3];
      _title = "New Flat Group";
      _action = "Create";
      _goTo = "Group Login";
    });
  }

  void attempt() async {
    bool success = await _curPage.attempt(context);
    if (success) {
      switch (_curPage.runtimeType) {
        case LoginPage:
          setGroupLoginPage();
          break;
        case SignupPage:
          setLoginPage();
          break;
        case GroupSignupPage:
          setGroupLoginPage();
          break;
      }
    }
  }

  void swap() {
    switch (_curPage.runtimeType) {
      case LoginPage:
        setSignupPage();
        break;
      case SignupPage:
        setLoginPage();
        break;
      case GroupLoginPage:
        setGroupSignupPage();
        break;
      case GroupSignupPage:
        setGroupLoginPage();
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              HeaderLarge("Flat-Out Management"),
              Container(
                margin: EdgeInsets.only(
                  left: UiStatics.leftGap,
                  right: UiStatics.rightGap,
                  top: UiStatics.verticalComponentGap,
                ),
                child: _loading
                    ? Loading(0.7)
                    : Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Container(
                            margin: EdgeInsets.only(bottom: UiStatics.verticalComponentGap),
                            child: Text(
                              _title,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  fontSize: Theme.of(context).textTheme.headline4?.fontSize,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                          _curPage,
                          Container(
                            margin: EdgeInsets.symmetric(vertical: 20),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                ElevatedButton(onPressed: attempt, child: Text(_action)),
                                TextButton(onPressed: swap, child: Text(_goTo))
                              ],
                            ),
                          )
                        ],
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
