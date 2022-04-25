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
      focusColor: Color(0xff2cc1ca),
      hoverColor: Color(0xff2cc1ca),
      highlightColor: Color(0xff2cc1ca),
      splashColor: Color(0xff2cc1ca),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.resolveWith<Color?>((Set<MaterialState> states) {
            return Color(0xff2cc1ca);
          }),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: ButtonStyle(
          foregroundColor: MaterialStateProperty.resolveWith<Color?>((Set<MaterialState> states) {
            return Color(0xff383e64);
          }),
        ),
      ),
      textTheme: GoogleFonts.getTextTheme(
          "Roboto Slab",
          TextTheme(
            headline1: TextStyle(color: Color(0xff383e64), fontSize: 50),
            headline2: TextStyle(color: Color(0xff383e64), fontSize: 40),
            headline3: TextStyle(
              color: Colors.grey[600],
              fontSize: 25,
            ),
            overline: TextStyle(
              color: Color(0xff383e64),
            ),
            subtitle1: TextStyle(
              color: Color(0xff092340),
              fontSize: 20,
            ),
            subtitle2: TextStyle(
              color: Color(0xff383e64),
              fontSize: 15,
            ),
            bodyText1: TextStyle(
              color: Color(0xff383e64),
            ),
            button: TextStyle(
              fontSize: 20,
              color: Color(0xff383e64),
            ),
            caption: TextStyle(
              fontSize: 20,
              color: Color(0xff383e64),
            ),
          )),
    );
  }

  static ThemeData dark() {
    return ThemeData.dark();
  }
}
