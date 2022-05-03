import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/no_group_alert.dart';
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
            padding: EdgeInsets.symmetric(
              horizontal: MediaQuery.of(context).size.width / 10,
              vertical: MediaQuery.of(context).size.height / 30,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                curPage,
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                ),
                TextButton(
                    onPressed: () {
                      Future.delayed(Duration.zero, NoGroupAlert.showAlertDialog(context));
                    },
                    child: Text("I'm not interested in a group...")),
                TextButton(onPressed: () {
                  context.read<RuntimeCache>().setUser(null);
                }, child: Text("Logout")),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
