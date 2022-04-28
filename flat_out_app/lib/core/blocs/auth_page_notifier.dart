import 'package:flutter/material.dart';

enum AuthPage { login, signup }

class AuthPageNotifier extends ChangeNotifier {
  static AuthPage _curPage = AuthPage.login;

  AuthPage currentPage() {
    return _curPage;
  }

  void switchPage(AuthPage page) {
    if (_curPage != page) {
      _curPage = page;
      notifyListeners();
    }
  }
}
