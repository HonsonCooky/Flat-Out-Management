import 'package:flat_out_app/screens/auth_flow/signup_page.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  final void Function(Widget page) switchPage;

  LoginPage({required this.switchPage});

  @override
  State<StatefulWidget> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width / 10),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            margin: EdgeInsets.only(bottom: 20),
            child: Text(
              "Back for more? \nYou'll need to login",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headline3,
            ),
          ),
          TextField(
            decoration: InputDecoration(
              hintText: "Username",
            ),
          ),
          TextField(
            decoration: InputDecoration(
              hintText: "Password",
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Todo: Login User
                  },
                  child: Text(
                    "Login",
                  ),
                ),
                TextButton(
                  onPressed: () {
                    widget.switchPage(SignupPage(switchPage: widget.switchPage));
                  },
                  child: Text(
                    "I don't have an account...",
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
