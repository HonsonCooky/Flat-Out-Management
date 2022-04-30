import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/user_auth_flow.dart';
import 'package:flutter/material.dart';

class AuthFlow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: Duration(milliseconds: 300),
      child: UserAuthFlow(),
    );
  }
}
