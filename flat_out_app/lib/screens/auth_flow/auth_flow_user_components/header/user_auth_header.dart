import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/header/header_animated_slide.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/header/header_logo.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/header/header_page_select.dart';
import 'package:flutter/material.dart';

class UserAuthHeader extends StatefulWidget {
  final bool isLoginPage;
  final void Function(bool) swapPage;

  UserAuthHeader({required this.isLoginPage, required this.swapPage});

  @override
  State<StatefulWidget> createState() => _UserAuthHeaderState();
}

class _UserAuthHeaderState extends State<UserAuthHeader> with TickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(vsync: this, duration: Duration(milliseconds: 300));

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
          HeaderAnimatedSlide(controller: _controller),
          HeaderPageSelect(controller: _controller, isLoginPage: widget.isLoginPage, swapPage: widget.swapPage),
        ],
      ),
    );
  }
}
