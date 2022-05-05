import 'package:flat_out_app/components/atoms/text_styles.dart';
import 'package:flutter/material.dart';

/**
 * Used to create consistent text fields in authentication pages.
 */
class AuthTextField extends StatefulWidget {
  final TextEditingController controller;
  final String hintText;
  final void Function(String)? onChanged;
  
  final String? errorText;
  final bool readOnly;
  
  final bool visiblePassword;
  final VoidCallback? obscureText;

  AuthTextField(
      {required this.hintText,
      required this.controller,
      this.onChanged,
      this.errorText,
      this.readOnly = false,
      this.visiblePassword = true,
      this.obscureText});

  @override
  State<StatefulWidget> createState() => _AuthTextFieldState();
}

class _AuthTextFieldState extends State<AuthTextField> {
  @override
  Widget build(BuildContext context) {
    return TextField(
      readOnly: widget.readOnly,
      controller: widget.controller,
      obscureText: !widget.visiblePassword,
      cursorColor: Theme.of(context).primaryColor,
      style: Theme.of(context).textTheme.labelLarge,
      decoration: InputDecoration(
        hintText: widget.readOnly ? "Not Required" : widget.hintText,
        hintStyle: InputTextStyle(context: context, readOnly: widget.readOnly),
        errorText: widget.errorText,
        errorBorder: UnderlineInputBorder(borderSide: BorderSide(width: 2.0, color: Theme.of(context).errorColor)),
        suffixIcon: widget.obscureText != null
            ? IconButton(
                icon: Icon(widget.visiblePassword ? Icons.visibility : Icons.visibility_off),
                splashRadius: Theme.of(context).textTheme.labelLarge?.fontSize,
                onPressed: widget.obscureText,
              )
            : null,
      ),
      onChanged: widget.onChanged,
    );
  }
}
