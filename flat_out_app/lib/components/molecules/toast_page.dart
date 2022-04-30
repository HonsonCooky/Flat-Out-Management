import 'package:flutter/material.dart';

abstract class ToastPage extends StatefulWidget {
  void successToast(String msg, BuildContext context) {
    final s = ScaffoldMessenger.of(context);
    s.showSnackBar(
      SnackBar(
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(20.0),
        content: Text(
          msg,
        ),
      ),
    );
  }

  void errorToast(String msg, BuildContext context) {
    final s = ScaffoldMessenger.of(context);
    s.showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.all(20.0),
      dismissDirection: DismissDirection.horizontal,
      content: Text(msg, style: Theme.of(context).textTheme.bodyText2),
      backgroundColor: Theme.of(context).errorColor,
    ));
  }

  void fuckMeToast(String id, BuildContext context) {
    final s = ScaffoldMessenger.of(context);
    s.showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.all(20.0),
      dismissDirection: DismissDirection.horizontal,
      content: Text("The developer of this app did an oopsie\nReference: ${id}",
          style: Theme.of(context).textTheme.bodyText2),
      backgroundColor: Theme.of(context).errorColor,
    ));
  }
}
