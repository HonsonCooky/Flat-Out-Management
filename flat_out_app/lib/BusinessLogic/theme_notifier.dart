import 'package:flutter/material.dart';

class _ThemeNotifier with ChangeNotifier {
  static bool _isDark = false;
  
  ThemeMode currentTheme(){
    return _isDark ? ThemeMode.dark : ThemeMode.light;
  }
  
  void switchTheme() {
    _isDark = !_isDark;
    notifyListeners();
  }
}

final _ThemeNotifier themeNotifier = _ThemeNotifier();