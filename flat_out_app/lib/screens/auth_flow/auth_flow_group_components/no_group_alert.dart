import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class NoGroupAlert {
  static showAlertDialog(BuildContext context) {
    // set up the buttons
    Widget cancelButton = TextButton(
      child: Text("Oops, go back!"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );
    Widget createGroupButton = ElevatedButton(
      child: Text("I'm sure"),
      onPressed: () {
        Navigator.of(context).pop();
        context.read<RuntimeCache>().readyCache();
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("No Flat Group *gasp*"),
      content: Container(
        height: MediaQuery.of(context).size.height / 5,
        child: Scrollbar(
          isAlwaysShown: true,
          child: Padding(
            padding: const EdgeInsets.only(right: 10),
            child: SingleChildScrollView(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      "The main purpose of this application, is to help flatting groups organize themselves. If you "
                          "don't want to join a group, no worries, just bare this in mind xx."
                          "\n\n - Are you sure you don't want to join/create a group?",
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
