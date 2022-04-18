import 'package:flat_out_app/Components/Molecules/generic_user_info_page.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  final TextEditingController usernameVal = new TextEditingController();
  final TextEditingController passwordVal = new TextEditingController();
  
  Future<bool> attemptLogin() async {
    print(usernameVal.text);
    print(passwordVal.text);
    
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GenericUserInfoExtract(
        title: "Login",
        children: [
          TextField(
            controller: usernameVal,
            decoration: InputDecoration(
              hintText: "Username",
            ),
          ),
          TextField(
            controller: passwordVal,
            obscureText: true,
            decoration: InputDecoration(
              hintText: "Password",
            ),
          )
        ],
        btnText: "Go",
        onSubmit: attemptLogin,
      ),
    );
  }
}
