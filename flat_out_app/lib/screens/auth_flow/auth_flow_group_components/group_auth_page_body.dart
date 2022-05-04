import 'package:flat_out_app/components/templates/alert.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class GroupAuthPageBody extends StatelessWidget {
  final Widget curPage;

  GroupAuthPageBody({required this.curPage});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Scrollbar(
        child: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.only(
              left: MediaQuery.of(context).size.width / 10,
              right: MediaQuery.of(context).size.width / 10,
              bottom: MediaQuery.of(context).size.height / 20,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  margin: EdgeInsets.only(bottom: 10),
                ),
                curPage,
                TextButton(
                    onPressed: () {
                      Future.delayed(
                        Duration.zero,
                        Alert.showAlertDialog(
                          context: context,
                          title: "No Flat Group *gasp*",
                          body: Text(
                            "The main purpose of this application, is to help flatting groups organize themselves"
                            ". If you don't want to join a group, no worries, just bare this in mind."
                            "\n\nAre you sure you don't want to join/create a group?",
                            style: Theme.of(context).textTheme.bodyText1,
                          ),
                          ps: "*psst* You can do this later if you want",
                          actions: [
                            TextButton(
                              child: Text("Oops, go back!"),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ),
                            ElevatedButton(
                              child: Text("I'm sure"),
                              onPressed: () {
                                Navigator.of(context).pop();
                                context.read<RuntimeCache>().readyCache();
                              },
                            ),
                          ],
                        ),
                      );
                    },
                    child: Text("Skip")),
                TextButton(
                    onPressed: () {
                      context.read<RuntimeCache>().setUser(null);
                    },
                    child: Text("Logout")),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
