import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

class FomThemes {
  static ThemeData light() {
    return ThemeData(
      primarySwatch: Colors.grey,
      primaryColor: Color(0xffe94174),
      secondaryHeaderColor: Color(0xffdead5c),
      scaffoldBackgroundColor: Color(0xffe8e5e0),
      cardColor: Color(0xffe8e5e0),
      dividerColor: Color(0xff383e64),      
      errorColor: Color(0xffe94f41),
      appBarTheme: AppBarTheme(
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: Color(0xff383e64),
        ),
        centerTitle: true,
        elevation: 5,
        backgroundColor: Color(0xff383e64),
        foregroundColor: Color(0xffe8e5e0),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: Color(0x96383e64),
        elevation: 0,
        contentTextStyle: TextStyle(
          color: Color(0xffe8e5e0),
          fontSize: 15,
        ),
        behavior: SnackBarBehavior.fixed,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.resolveWith<Color?>((Set<MaterialState> states) {
            return Color(0xffe94174);
          }),
          foregroundColor: MaterialStateProperty.resolveWith<Color?>((Set<MaterialState> states) {
            return Color(0xffe8e5e0);
          }),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: ButtonStyle(
          foregroundColor: MaterialStateProperty.resolveWith<Color?>((Set<MaterialState> states) {
            return Color(0xffe94174);
          }),
        ),
      ),
      textTheme: GoogleFonts.getTextTheme(
          "Roboto Slab",
          TextTheme(
              headline1: TextStyle(color: Color(0xffe8e5e0), fontSize: 40, fontWeight: FontWeight.bold),
              headline2: TextStyle(color: Color(0xff383e64), fontSize: 40, fontWeight: FontWeight.bold),
              headline3: TextStyle(color: Color(0xffe8e5e0), fontSize: 40, fontWeight: FontWeight.bold),
              headline4: TextStyle(color: Color(0xff383e64), fontSize: 35, fontWeight: FontWeight.bold),
              headline5: TextStyle(color: Color(0xff383e64), fontSize: 30),
              headline6: TextStyle(color: Color(0xff383e64), fontWeight: FontWeight.bold),
              overline: TextStyle(
                color: Color(0xff383e64),
              ),
              subtitle1: TextStyle(
                color: Color(0xff092340),
                fontSize: 15,
              ),
              subtitle2: TextStyle(
                color: Color(0xff383e64),
                fontSize: 15,
              ),
              bodyText1: TextStyle(
                color: Color(0xff383e64),
              ),
              bodyText2: TextStyle(
                color: Color(0xffe8e5e0),
              ),
              button: TextStyle(
                fontSize: 20,
              ),
              caption: TextStyle(
                fontSize: 12,
                color: Color(0xff383e64),
              ),
              labelMedium: TextStyle(
                fontSize: 20,
              ))),
    );
  }

  static ThemeData dark() {
    return ThemeData.dark();
  }
}
