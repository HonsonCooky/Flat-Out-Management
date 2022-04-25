import 'package:flat_out_app/screens/auth_flow/login_page.dart';
import 'package:flutter/material.dart';

class SignupPage extends StatefulWidget {
  final void Function(Widget page) switchPage;

  SignupPage({required this.switchPage});

  @override
  State<StatefulWidget> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width / 10),
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 20),
              child: Text(
                "Welcome new user!\nLet's get started.",
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
            TextField(
              decoration: InputDecoration(
                hintText: "Confirm Password",
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      // Todo: Signup User
                    },
                    child: Text(
                      "Signup",
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      widget.switchPage(LoginPage(switchPage: widget.switchPage));
                    },
                    child: Text(
                      "Back to Login",
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
