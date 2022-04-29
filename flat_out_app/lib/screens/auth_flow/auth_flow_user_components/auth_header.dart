import 'package:flat_out_app/core/ui_functional_components/auth_page_notifier.dart';
import 'package:flat_out_app/core/ui_functional_components//ui_statics.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AuthHeader extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthHeaderState();
}

class _AuthHeaderState extends State<AuthHeader> with TickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: Duration(milliseconds: 300));
  late final Tween<double> _pointTween =
      Tween<double>(begin: UiStatics.headerInset, end: MediaQuery.of(context).size.width - UiStatics.headerInset);
  late final Animation<double> _pointAnimation = _pointTween.animate(_controller)
    ..addListener(() {
      setState(() {});
    });

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AuthPage curPage = Provider.of<AuthPageNotifier>(context, listen: true).currentPage();

    return Container(
      child: Column(
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 20),
            color: Theme.of(context).dividerColor,
            child: Column(
              children: [
                Icon(
                  Icons.real_estate_agent_outlined,
                  color: Theme.of(context).scaffoldBackgroundColor,
                  size: MediaQuery.of(context).size.height / 10,
                ),
                Text(
                  "Flat-Out Management",
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.headline3,
                ),
              ],
            ),
          ),
          CustomPaint(
            painter: ShapePainter(value: _pointAnimation.value),
            size: Size(MediaQuery.of(context).size.width, 50),
          ),
          Container(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextButton(
                    onPressed: () {
                      FocusManager.instance.primaryFocus?.unfocus();
                      context.read<AuthPageNotifier>().switchPage(AuthPage.login);
                      _controller.reverse();
                    },
                    style: ButtonStyle(
                        foregroundColor: curPage == AuthPage.login
                            ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color)
                            : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color),
                        textStyle: curPage == AuthPage.login
                            ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4)
                            : MaterialStateProperty.all(Theme.of(context).textTheme.headline5)),
                    child: Text("Login")),
                Text(
                  "|",
                  style: Theme.of(context).textTheme.headline5,
                ),
                TextButton(
                    onPressed: () {
                      FocusManager.instance.primaryFocus?.unfocus();
                      context.read<AuthPageNotifier>().switchPage(AuthPage.signup);
                      _controller.forward();
                    },
                    style: ButtonStyle(
                        foregroundColor: curPage == AuthPage.signup
                            ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color)
                            : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color),
                        textStyle: curPage == AuthPage.signup
                            ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4)
                            : MaterialStateProperty.all(Theme.of(context).textTheme.headline5)),
                    child: Text("Signup"))
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ShapePainter extends CustomPainter {
  double value;

  ShapePainter({required this.value}) : super();

  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()..color = Color(0xff383e64);

    Path path = Path();
    path.moveTo(0, -1);
    path.lineTo(size.width, -1);
    path.lineTo(size.width, size.height);
    // path.quadraticBezierTo(value, -20, 0, size.height);
    path.lineTo(value, size.height / 3);
    path.lineTo(0, size.height);

    // canvas.drawShadow(path, Colors.black, 5, true);
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}
