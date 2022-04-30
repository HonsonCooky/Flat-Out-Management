import 'package:flutter/material.dart';

class HeaderPageSelect extends StatefulWidget {
  final AnimationController controller;
  final bool isLoginPage;
  final void Function(bool) swapPage;

  HeaderPageSelect({required this.controller, required this.isLoginPage, required this.swapPage});

  @override
  State<StatefulWidget> createState() => _HeaderPageSelect();
}

class _HeaderPageSelect extends State<HeaderPageSelect> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TextButton(
              onPressed: () {
                FocusManager.instance.primaryFocus?.unfocus();
                widget.swapPage(true);
                widget.controller.reverse();
              },
              style: ButtonStyle(
                  foregroundColor: widget.isLoginPage
                      ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color)
                      : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color),
                  textStyle: widget.isLoginPage
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
              widget.swapPage(false);
              widget.controller.forward();
            },
            style: ButtonStyle(
                foregroundColor: !widget.isLoginPage
                    ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color)
                    : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color),
                textStyle: !widget.isLoginPage
                    ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4)
                    : MaterialStateProperty.all(Theme.of(context).textTheme.headline5)),
            child: Text("Signup"),
          ),
        ],
      ),
    );
  }
}
