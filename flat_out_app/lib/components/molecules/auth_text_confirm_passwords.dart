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
    if (widget.controller2 != null) {
      return Row(children: [
        Expanded(
          child: Stack(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: MediaQuery.of(context).size.width / 1.6,
                    child: AuthTextField(
                      onChanged: widget.onChanged,
                      hintText: widget.hintText,
                      controller: widget.controller,
                      readOnly: widget.readOnly,
                      visiblePassword: _visiblePasswords,
                    ),
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
              Positioned(
                left: MediaQuery.of(context).size.width / 1.5,
                top: Theme.of(context).textTheme.labelLarge?.fontSize,
                child: IconButton(
                  alignment: Alignment.bottomCenter,
                  icon: Icon(_visiblePasswords ? Icons.visibility_off : Icons.visibility),
                  splashRadius: 1.5 * (Theme.of(context).textTheme.labelLarge?.fontSize ?? 10),
                  onPressed: widget.readOnly ? null : obscureText,
                ),
              )
            ],
          ),
        ),
      ]);
    } else {
      return AuthTextField(
        onChanged: widget.onChanged,
        hintText: widget.hintText,
        controller: widget.controller,
        readOnly: widget.readOnly,
        visiblePassword: _visiblePasswords,
        obscureText: obscureText,
      );
    }
  }
}
