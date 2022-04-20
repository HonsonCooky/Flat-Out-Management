import 'package:flat_out_app/Components/Atoms/loading.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/auth_page.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/login_page.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/signup_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../BusinessLogic/runtime_cache.dart';
import '../../Components/Atoms/header_large.dart';
import '../../Components/Atoms/unfocus_wrapper.dart';

class AuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthFlowState();
}

class _AuthFlowState extends State<AuthFlow> {
  bool _loading = true;
  int _curPage = 0;
  List<AuthPage> _pages = [LoginPage(), SignupPage()];

  @override
  void initState() {
    super.initState();
    context.read<RuntimeCache>().init().catchError((_) {}).whenComplete(() => setState(() {
          _loading = false;
        }));
  }

  void swap() {}

  @override
  Widget build(BuildContext context) {
    _loading = context.read<RuntimeCache>().user != null;
    AuthPage page = _pages[_curPage];
    AuthPage other = _pages[(_curPage + 1) % _pages.length];

    return UnFocusWrapper(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              HeaderLarge("Flat-Out Management"),
              Container(
                margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width / 20, vertical: 100),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _loading ? Loading() : page,
                    Container(
                      margin: EdgeInsets.symmetric(vertical: 20),
                    ),
                    ElevatedButton(
                        onPressed: () {
                          page.attempt(context);
                        },
                        child: Text(page.action)),
                    TextButton(
                        onPressed: () {
                          setState(() {
                            _curPage = (_curPage + 1) % _pages.length;
                          });
                        },
                        child: Text(other.title))
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
