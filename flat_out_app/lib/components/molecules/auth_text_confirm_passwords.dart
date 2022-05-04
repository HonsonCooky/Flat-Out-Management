import 'package:flat_out_app/components/molecules/auth_text_field.dart';
import 'package:flutter/cupertino.dart';

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
    return Column(
      children: [
        AuthTextField(
          onChanged: widget.onChanged,
          hintText: widget.hintText,
          controller: widget.controller,
          readOnly: widget.readOnly,
          visiblePassword: _visiblePasswords,
          obscureText: obscureText,
        ),
        (widget.controller2 != null
            ? AuthTextField(
                onChanged: widget.onChanged,
                hintText: "Confirm ${widget.hintText}",
                controller: widget.controller2!,
                readOnly: widget.readOnly,
                visiblePassword: _visiblePasswords,
                errorText: widget.controller.text != widget.controller2!.text ? "Mismatched Password" : null,
                obscureText: obscureText,
              )
            : Container()),
      ],
    );
  }
}
