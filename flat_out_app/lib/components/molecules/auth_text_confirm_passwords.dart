import 'package:flat_out_app/components/molecules/auth_text_field.dart';
import 'package:flutter/cupertino.dart';

class AuthTextConfirmPasswords extends StatefulWidget {
  final TextEditingController controller1;
  final TextEditingController controller2;
  final String hintText;

  AuthTextConfirmPasswords({required this.controller1, required this.controller2, required this.hintText});

  @override
  State<StatefulWidget> createState() => _AuthTextConfirmPasswordsState();
}

class _AuthTextConfirmPasswordsState extends State<AuthTextConfirmPasswords> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AuthTextField(hintText: widget.hintText, controller: widget.controller1),
        AuthTextField(hintText: "Confirm ${widget.hintText}", controller: widget.controller2),
      ],
    );
  }
}
