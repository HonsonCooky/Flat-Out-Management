import 'package:flutter/material.dart';

abstract class ToastPage extends StatefulWidget {
  void successToast(String msg, BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.all(20.0),
      content: Text(msg),
      action: SnackBarAction(
        label: 'Dismiss',
        onPressed: () {},
      ),
    ));
  }

  void errorToast(String msg, BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.all(20.0),
      content: Text(msg),
      backgroundColor: Theme.of(context).errorColor,
      action: SnackBarAction(
        label: 'Dismiss',
        onPressed: () {},
      ),
    ));
  }
}
