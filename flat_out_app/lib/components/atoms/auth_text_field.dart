import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class AuthTextField extends StatelessWidget {
  final TextEditingController controller;
  final bool obscureText;
  final String hintText;
  final void Function(String)? onChanged;
  final String? error;

  AuthTextField(
      {required this.hintText, required this.controller, this.obscureText = false, this.onChanged, this.error});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      cursorColor: Theme.of(context).primaryColor,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: TextStyle(color: Theme.of(context).primaryColor.withAlpha(150)),
        errorText: error,
        errorBorder: UnderlineInputBorder(
          borderSide: BorderSide(width: 2.0, color: Theme.of(context).errorColor)
        ),
      ),
      onChanged: onChanged,
    );
  }
}
