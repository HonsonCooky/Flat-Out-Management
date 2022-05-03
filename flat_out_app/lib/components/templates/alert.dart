import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flutter/material.dart';

class Alert {
  static showAlertDialog(
      {required BuildContext context, required String title, required Widget body, String? ps, List<Widget>? actions}) {
    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      contentPadding: EdgeInsets.zero,
      title: Text(title),
      content: UnFocusWrapper(
        extraFunction: () {
          if (Navigator.canPop(context)) Navigator.pop(context);
        },
        child: Scrollbar(
          isAlwaysShown: true,
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: SingleChildScrollView(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    body,
                    Container(
                      margin: EdgeInsets.all(10),
                    ),
                    Text(
                      ps ?? "",
                      style: Theme.of(context).textTheme.caption,
                      textAlign: TextAlign.start,
                    ),
                  ]),
            ),
          ),
        ),
      ),
      actions: actions,
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }
}
