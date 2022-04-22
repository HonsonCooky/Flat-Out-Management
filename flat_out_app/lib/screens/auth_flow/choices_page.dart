import 'package:flutter/material.dart';

import '../../components/atoms/fom_round_button.dart';
import '../../components/molecules/route_handler.dart';
import 'login_page.dart';

class ChoicesPage extends StatelessWidget {
  get buttonWidth => null;

  get fontSize => null;

  @override
  Widget build(BuildContext context) {
    final double buttonWidth = MediaQuery.of(context).size.width / 4;
    final double fontSize = 25.0;
    
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            alignment: Alignment.center,
            margin: EdgeInsets.only(bottom: MediaQuery.of(context).size.height / 20),
            child: Text(
              "Flat-Out Management",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headline2,
            ),
          ),
          FomRoundButton(
            rad: BorderRadius.only(topRight: Radius.circular(MediaQuery.of(context).size.height)),
            width: buttonWidth,
            onPressed: () {
              Navigator.push(context, ParentChildPageChange(page: LoginPage()));
            },
            children: [
              Container(
                child: Icon(
                  Icons.login,
                  size: fontSize,
                ),
                margin: EdgeInsets.only(right: 10),
              ),
              Text(
                "Login",
                style: TextStyle(fontSize: fontSize),
              )
            ],
          ),
          FomRoundButton(
            rad: BorderRadius.only(bottomRight: Radius.circular(MediaQuery.of(context).size.height)),
            width: buttonWidth,
            onPressed: () {
              Navigator.push(context, ParentChildPageChange(page: LoginPage()));
            },
            children: [
              Container(
                child: Icon(
                  Icons.how_to_reg,
                  size: fontSize,
                ),
                margin: EdgeInsets.only(right: 10),
              ),
              Text(
                "Register",
                style: TextStyle(fontSize: fontSize),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
