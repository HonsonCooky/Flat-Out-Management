import 'package:flat_out_app/screens/auth_flow/auth_generic/header_animated_slide.dart';
import 'package:flat_out_app/screens/auth_flow/auth_generic/header_logo.dart';
import 'package:flutter/material.dart';

class UserAuthHeader extends StatefulWidget {
  final String curPage;
  final void Function(String) swapPage;

  UserAuthHeader({required String this.curPage, required this.swapPage});

  @override
  State<StatefulWidget> createState() => _UserAuthHeaderState();
}

class _UserAuthHeaderState extends State<UserAuthHeader> with TickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: Duration(milliseconds: 200));

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          HeaderLogo(),
          HeaderAnimatedSlide(
            controller: _controller,
            curPage: widget.curPage,
            buttonNames: ["Login", "Signup"],
            swapPage: widget.swapPage,
          ),
        ],
      ),
    );
  }
}
