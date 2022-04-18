import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FomThemes {
  static ThemeData light() {
    return ThemeData(
      primarySwatch: Colors.brown,
      primaryColor: const Color(0xff6a9144),
      primaryColorLight: Colors.brown,
      canvasColor: const Color(0xffe6e4e4),
      focusColor: Colors.lightGreen,
      errorColor: const Color(0xfff48d36),
      cardColor: Colors.lightGreen,
      
      textTheme: GoogleFonts.getTextTheme("Merriweather Sans", TextTheme(
        headline1: TextStyle(
          color: Color(0xff000000),
        ),
        headline2: TextStyle(
          color: Color(0xff000000),
        ),
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
