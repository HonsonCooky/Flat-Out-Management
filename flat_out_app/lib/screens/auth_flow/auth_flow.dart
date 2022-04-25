import 'package:flat_out_app/components/atoms/loading.dart';
import 'package:flat_out_app/components/molecules/blobs_background.dart';
import 'package:flat_out_app/screens/auth_flow/login_page.dart';
import 'package:flutter/material.dart';

class AuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthFlowState();
}

class _AuthFlowState extends State<AuthFlow> with SingleTickerProviderStateMixin {
  Widget? _curPage;
  late final AnimationController _controller = AnimationController(
    duration: const Duration(seconds: 2),
    vsync: this,
  );

  @override
  void initState() {
    super.initState();
    _curPage = LoginPage(switchPage: switchPage);
  }

  void switchPage(Widget page) {
    setState(() {
      _curPage = page;
    });
  }

  @override
  Widget build(BuildContext context) {
    return BlobBackground(
      child: SingleChildScrollView(
        padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 4),
        child: Container(
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(bottom: 10),
                child: Text(
                  "Flat-Out Management",
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.headline1,
                ),
              ),
              AnimatedSwitcher(
                duration: Duration(milliseconds: 200),
                child: _curPage != null ? _curPage : Loading(),
                transitionBuilder: (Widget child, Animation<double> animation) => SlideTransition(
                  position: Tween(begin: Offset(1.0, 0.0), end: Offset(0.0, 0.0)).animate(animation),
                  child: AnimatedSwitcher(
                    duration: Duration(milliseconds: 200),
                    child: _curPage != null ? _curPage : Loading(),
                    transitionBuilder: (Widget child, Animation<double> animation) => FadeTransition(
                      opacity: animation,
                      child: child,
                    ),
                  ),
                ),
              ),
              Container(margin: EdgeInsets.symmetric(vertical: 20),)
            ],
          ),
        ),
      ),
    );
  }
}
