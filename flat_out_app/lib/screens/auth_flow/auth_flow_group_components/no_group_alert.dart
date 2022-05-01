import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class NoGroupAlert {
  static showAlertDialog(BuildContext context) {
    // set up the buttons
    Widget cancelButton = TextButton(
      child: Text("Not now"),
      onPressed: () {
        Navigator.of(context).pop();
        context.read<RuntimeCache>().readyCache();
      },
    );
    Widget createGroupButton = ElevatedButton(
      child: Text("Join/Setup"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("No Flat Group *gasp*"),
      content: Container(
        height: MediaQuery.of(context).size.height / 7,
        child: Scrollbar(
          isAlwaysShown: true,
          child: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    "It seems you are not yet associated with a flat group. "
                    "Would you like to join/setup one now?",
                    style: Theme.of(context).textTheme.bodyText1,
                  ),
                  Container(
                    margin: EdgeInsets.all(10),
                  ),
                  Text(
                    "*psst* You can do this later if you want",
                    style: Theme.of(context).textTheme.caption,
                    textAlign: TextAlign.start,
                  ),
                ]),
          ),
        ),
      ),
      actions: [
        cancelButton,
        createGroupButton,
      ],
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
