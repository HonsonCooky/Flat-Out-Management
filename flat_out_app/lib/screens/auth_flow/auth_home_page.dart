import 'package:flat_out_app/components/molecules/blobs_background.dart';
import 'package:flat_out_app/components/molecules/route_handler.dart';
import 'package:flutter/material.dart';

import '../../components/atoms/fom_round_button.dart';
import 'login_page.dart';

class AuthHomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => AuthHomePageState();
}

class AuthHomePageState extends State<AuthHomePage> {
  @override
  Widget build(BuildContext context) {
    final double buttonWidth = MediaQuery.of(context).size.width / 4;
    final double fontSize = 30.0;
    final double rad = MediaQuery.of(context).size.width;

    return BlobBackground(
      child: Container(
        padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 3.5),
        child: Column(
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
              rad: BorderRadius.only(topRight: Radius.elliptical(rad/2, rad)),
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
              rad: BorderRadius.only(bottomRight: Radius.elliptical(rad, rad*2)),
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
      ),
    );
  }
}
