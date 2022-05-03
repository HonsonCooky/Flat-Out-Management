import 'package:flat_out_app/components/atoms/text_styles.dart';
import 'package:flutter/material.dart';

/**
 * Used to create consistent text fields in authentication pages.
 */
class AuthTextField extends StatefulWidget {
  final TextEditingController controller;
  final bool canObscure;
  final bool? visiblePassword;
  final String hintText;
  final void Function(String)? onChanged;
  final String? error;
  final bool readOnly;
  final IconButton? suffixIcon;

  AuthTextField(
      {required this.hintText,
      required this.controller,
      this.canObscure = false,
      this.onChanged,
      this.error,
      this.readOnly = false,
      this.suffixIcon,
      this.visiblePassword});

  @override
  State<StatefulWidget> createState() => _AuthTextFieldState();
}

class _AuthTextFieldState extends State<AuthTextField> {
  late bool _visiblePassword;

  @override
  void initState() {
    super.initState();
    _visiblePassword = widget.canObscure;
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      readOnly: widget.readOnly,
      controller: widget.controller,
      obscureText: widget.canObscure,
      cursorColor: Theme.of(context).primaryColor,
      style: Theme.of(context).textTheme.labelLarge,
      decoration: InputDecoration(
        hintText: widget.readOnly ? "Not Required" : widget.hintText,
        hintStyle: TextStyles.inputTextStyle(context: context, readOnly: widget.readOnly),
        errorText: widget.error,
        errorBorder: UnderlineInputBorder(borderSide: BorderSide(width: 2.0, color: Theme.of(context).errorColor)),
        suffixIcon: widget.canObscure && widget.visiblePassword == null
            ? IconButton(
                icon: Icon(_visiblePassword ? Icons.visibility : Icons.visibility_off),
                splashRadius: Theme.of(context).textTheme.labelLarge?.fontSize,
                onPressed: () {
                  setState(() {
                    _visiblePassword = !_visiblePassword;
                  });
                },
              )
            : null,
      ),
      onChanged: widget.onChanged,
    );
  }
}
