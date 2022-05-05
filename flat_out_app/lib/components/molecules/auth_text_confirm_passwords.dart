import 'package:flat_out_app/components/molecules/auth_text_field.dart';
import 'package:flutter/material.dart';

class AuthTextConfirmPasswords extends StatefulWidget {
  final TextEditingController controller;
  final TextEditingController? controller2;

  final String hintText;
  final void Function(String)? onChanged;

  final bool readOnly;

  AuthTextConfirmPasswords(
      {required this.controller, this.controller2, required this.hintText, this.onChanged, this.readOnly = false});

  @override
  State<StatefulWidget> createState() => _AuthTextConfirmPasswordsState();
}

class _AuthTextConfirmPasswordsState extends State<AuthTextConfirmPasswords> {
  late bool _visiblePasswords;

  @override
  void initState() {
    super.initState();
    _visiblePasswords = false;
  }

  void obscureText() {
    setState(() {
      _visiblePasswords = !_visiblePasswords;
    });
  }

  @override
  Widget build(BuildContext context) {
    return widget.controller2 != null
        ? Row(
          children: [
            Expanded(
              child: Column(
                children: [
                  AuthTextField(
                    onChanged: widget.onChanged,
                    hintText: widget.hintText,
                    controller: widget.controller,
                    readOnly: widget.readOnly,
                    visiblePassword: _visiblePasswords,
                  ),
                  AuthTextField(
                    onChanged: widget.onChanged,
                    hintText: "Confirm ${widget.hintText}",
                    controller: widget.controller2!,
                    readOnly: widget.readOnly,
                    visiblePassword: _visiblePasswords,
                    errorText: widget.controller.text != widget.controller2!.text ? "Mismatched Password" : null,
                  ),
                ],
              ),
            ),
            IconButton(
              icon: Icon(_visiblePasswords ? Icons.visibility : Icons.visibility_off),
              splashRadius: Theme.of(context).textTheme.labelLarge?.fontSize,
              onPressed: obscureText,
            )
          ]
        )
        : AuthTextField(
            onChanged: widget.onChanged,
            hintText: widget.hintText,
            controller: widget.controller,
            readOnly: widget.readOnly,
            visiblePassword: _visiblePasswords,
            obscureText: obscureText,
          );
  }
}
