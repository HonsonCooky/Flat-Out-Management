import 'package:flutter/material.dart';

/**
 * Used to create consistent text fields in authentication pages.
 */
class AuthTextField extends StatelessWidget {
  final TextEditingController controller;
  final bool obscureText;
  final String hintText;
  final void Function(String)? onChanged;
  final String? error;
  final bool readOnly;

  AuthTextField(
      {required this.hintText,
      required this.controller,
      this.obscureText = false,
      this.onChanged,
      this.error,
      this.readOnly = false});

  @override
  Widget build(BuildContext context) {
    return TextField(
      readOnly: readOnly,
      controller: controller,
      obscureText: obscureText,
      cursorColor: Theme.of(context).primaryColor,
      style: Theme.of(context).textTheme.labelLarge,
      decoration: InputDecoration(
        hintText: readOnly ? "Not Required" : hintText,
        hintStyle: TextStyle(
            color: readOnly ? Colors.grey.withAlpha(150) : Theme.of(context).primaryColor.withAlpha(150),
            fontSize: Theme.of(context).textTheme.labelLarge?.fontSize),
        errorText: error,
        errorBorder: UnderlineInputBorder(borderSide: BorderSide(width: 2.0, color: Theme.of(context).errorColor)),
      ),
      onChanged: onChanged,
    );
  }
}
