import 'package:flutter/material.dart';

abstract class ToastPage extends StatefulWidget {
  void successToast(String msg, BuildContext context) {
    final s = ScaffoldMessenger.of(context);
    s.showSnackBar(
      SnackBar(
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(20.0),
        content: Text(msg),
        backgroundColor: Color(0xff92e941),
      ),
    );
  }

  void errorToast(String msg, BuildContext context) {
    final s = ScaffoldMessenger.of(context);
    s.showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.all(20.0),
      dismissDirection: DismissDirection.horizontal,
      content: Text(msg),
      backgroundColor: Theme.of(context).errorColor,
    ));
  }
}
