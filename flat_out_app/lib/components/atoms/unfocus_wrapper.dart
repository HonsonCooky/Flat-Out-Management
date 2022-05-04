import 'package:flutter/cupertino.dart';

/**
 * A component wrapper which removes focus from components on tap. Usually used as a wrapper for pages, such that on
 * tapping away from a text field, the keyboard is dismissed.
 */
class UnFocusWrapper extends StatelessWidget {
  final Widget child;
  final VoidCallback? extraFunction;

  UnFocusWrapper({required this.child, this.extraFunction});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      onTap: () {
        if (extraFunction != null) extraFunction!();
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: child,
    );
  }
}
