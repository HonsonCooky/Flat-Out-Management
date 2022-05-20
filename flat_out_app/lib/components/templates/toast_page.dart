import 'package:flutter/material.dart';

/**
 * A wrapper for using constant toast components on some scaffold.
 */
abstract class ToastWrapper extends StatefulWidget {
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

  void infoToast(String msg, BuildContext context) {
    final s = ScaffoldMessenger.of(context);
    s.showSnackBar(
      SnackBar(
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(20.0),
        content: Text(
          msg,
        ),
        backgroundColor: Theme.of(context).secondaryHeaderColor.withAlpha(190),
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
      backgroundColor: Theme.of(context).errorColor.withAlpha(190),
    ));
  }

  void devErrorToast(String id, BuildContext context) {
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
