import 'package:flat_out_app/screens/auth_flow/auth_generic/header_animated_slide.dart';
import 'package:flat_out_app/screens/auth_flow/auth_generic/header_logo.dart';
import 'package:flutter/material.dart';

class GroupAuthHeader extends StatefulWidget {
  final String curPage;
  final void Function(String) swapPage;

  GroupAuthHeader({required String this.curPage, required this.swapPage});

  @override
  State<StatefulWidget> createState() => _GroupAuthHeaderState();
}

class _GroupAuthHeaderState extends State<GroupAuthHeader> with TickerProviderStateMixin {
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
          HeaderLogo(
            title: "Setup Group Association",
          ),
          HeaderAnimatedSlide(
            controller: _controller,
            curPage: widget.curPage,
            buttonNames: ["Join", "Create"],
            swapPage: widget.swapPage,
          ),
        ],
      ),
    );
  }
}
