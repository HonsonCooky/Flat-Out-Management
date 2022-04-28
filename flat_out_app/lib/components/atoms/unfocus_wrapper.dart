import 'package:flutter/cupertino.dart';

class UnFocusWrapper extends StatelessWidget {
  final Widget child;

  UnFocusWrapper({required this.child});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      onTap: () {
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: child,
    );
  }
}
