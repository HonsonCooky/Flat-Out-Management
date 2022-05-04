import 'package:flutter/material.dart';

class TextStyles {
  static TextStyle inputTextStyle({required BuildContext context, double? fontSize, bool? readOnly}) {
    return TextStyle(
        color: (readOnly != null && readOnly) ? Colors.grey.withAlpha(150) : Theme.of(context).primaryColor.withAlpha(150),
        fontSize: fontSize ?? Theme.of(context).textTheme.labelLarge?.fontSize);
  }
}
