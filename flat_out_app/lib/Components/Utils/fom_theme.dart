import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FomThemes {
  static ThemeData light() {
    return ThemeData(
      primarySwatch: Colors.grey,
      primaryColor: Color(0xffe94174),
      secondaryHeaderColor: Color(0xffdead5c),
      scaffoldBackgroundColor: Color(0xffe8e5e0),
      dividerColor: Color(0xff383e64),
      focusColor: Color(0xff736aae),
      hoverColor: Color(0xff736aae),
      highlightColor: Color(0xff736aae),
      splashColor: Color(0xff736aae),
      textTheme: GoogleFonts.getTextTheme(
          "Merriweather Sans",
          TextTheme(
            headline1: TextStyle(color: Color(0xff000000), fontWeight: FontWeight.bold),
            headline2: TextStyle(color: Color(0xff000000), fontSize: 50, fontWeight: FontWeight.bold),
            headline3: TextStyle(
              color: Color(0xff000000),
            ),
            headline4: TextStyle(
              color: Color(0xff000000),
            ),
            headline5: TextStyle(
              color: Color(0xff000000),
            ),
            headline6: TextStyle(
              color: Color(0xff000000),
            ),
            overline: TextStyle(
              color: Color(0xff000000),
            ),
            subtitle1: TextStyle(
              color: Color(0xff000000),
            ),
            subtitle2: TextStyle(
              color: Color(0xff000000),
            ),
            bodyText1: TextStyle(
              color: Color(0xff000000),
            ),
            bodyText2: TextStyle(
              color: Color(0xff000000),
            ),
            button: TextStyle(
              color: Color(0xff000000),
            ),
            caption: TextStyle(
              color: Color(0xff5e5e5e),
            ),
          )),
    );
  }

  static ThemeData dark() {
    return ThemeData.dark();
  }
}
