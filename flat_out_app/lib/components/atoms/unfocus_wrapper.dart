import 'package:flutter/cupertino.dart';

/**
 * A component wrapper which removes focus from components on tap. Usually used as a wrapper for pages, such that on 
 * tapping away from a text field, the keyboard is dismissed.
 */
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
