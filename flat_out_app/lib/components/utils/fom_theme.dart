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
      hintColor: Color(0x88e94174),
      
      errorColor: Color(0xffe95541),
      appBarTheme: AppBarTheme(
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: Color(0xff383e64),
        ),
        centerTitle: true,
        elevation: 5,
        backgroundColor: Color(0xff383e64),
        foregroundColor: Color(0xffe8e5e0),
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
              headline1: TextStyle(color: Color(0xffe8e5e0), fontSize: 50, fontWeight: FontWeight.bold),
              headline2: TextStyle(color: Color(0xff383e64), fontSize: 50, fontWeight: FontWeight.bold),
              headline3: TextStyle(color: Color(0xffe8e5e0), fontSize: 40, fontWeight: FontWeight.bold),
              headline4: TextStyle(color: Color(0xff383e64), fontSize: 30, fontWeight: FontWeight.bold),
              headline5: TextStyle(color: Color(0xff383e64), fontSize: 25),
              headline6: TextStyle(fontWeight: FontWeight.bold),
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
              ),
              caption: TextStyle(
                fontSize: 10,
                color: Color(0xff383e64),
              ),
              labelMedium: TextStyle(
                fontSize: 5,
              ))),
    );
  }

  static ThemeData dark() {
    return ThemeData.dark();
  }
}
