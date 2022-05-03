import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/no_group_alert.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class GroupAuthPageBody extends StatelessWidget {
  final Widget curPage;

  GroupAuthPageBody({required this.curPage});

  @override
  Widget build(BuildContext context) {
    FomUser? u = context.read<RuntimeCache>().user;

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
                Text(
                  "Welcome ${u?.uiName ?? "unknown?"}!",
                  textAlign: TextAlign.start,
                  style: Theme.of(context).textTheme.labelMedium,
                ),
                Text(
                  "You don't seem to be associated with a flatting group yet. Join a pre-existing group, or create a "
                      "new one for you and your flatmates.",
                  textAlign: TextAlign.start,
                  style: Theme.of(context).textTheme.bodyText1,
                ),
                Container(margin: EdgeInsets.only(bottom: 10),),
                curPage,
                TextButton(
                    onPressed: () {
                      Future.delayed(Duration.zero, NoGroupAlert.showAlertDialog(context));
                    },
                    child: Text("I'm not interested in a group...")),
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
