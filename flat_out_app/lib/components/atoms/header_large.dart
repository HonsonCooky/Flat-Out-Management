import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HeaderLarge extends StatelessWidget {
  final String title;
  final double Function(BuildContext context) xRad = (BuildContext context) => MediaQuery.of(context).size.width * 10;
  final double Function(BuildContext context) yRad = (BuildContext context) => MediaQuery.of(context).size.height / 3;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height / 3,
      alignment: Alignment.bottomCenter,
      padding: EdgeInsets.symmetric(vertical: 40.0, horizontal: 15.0),
      child: Text(
        title,
        style: Theme.of(context).textTheme.headline2,
        textAlign: TextAlign.center,
      ),
      decoration: BoxDecoration(
          color: Theme.of(context).primaryColor,
          borderRadius: BorderRadius.vertical(bottom: Radius.elliptical(xRad(context), yRad(context)))),
    );
  }

  HeaderLarge(this.title);
}
