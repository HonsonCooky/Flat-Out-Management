import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/components/templates/alert.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_header.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_page_body.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_create_page.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_join_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class GroupAuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _GroupAuthFlow();
}

class _GroupAuthFlow extends State<GroupAuthFlow> {
  String _pageStr = "Join";
  late Widget _joinPage;
  late Widget _createPage;
  late Widget _curPage;

  @override
  void initState() {
    super.initState();
    _joinPage = GroupJoinPage();
    _createPage = GroupCreatePage();
    _curPage = _joinPage;
    Future.delayed(
      Duration(seconds: 1),
      () {
        bool cacheReady = context.read<RuntimeCache>().cacheReady;
        if (cacheReady) return;

        FomUser? u = context.read<RuntimeCache>().user;
        Alert.showAlertDialog(
          context: context,
          title: "Welcome ${u?.uiName ?? "unknown?"}!",
          body: Text(
            "You don't seem to be associated with a flatting group yet. \nJoin a pre-existing group, or create a "
            "new one for you and your flatmates.",
            style: Theme.of(context).textTheme.bodyText1,
          ),
        );
      },
    );
  }

  void swapPageUser(String p) {
    if (_pageStr == p) return;

    Widget page = _joinPage;
    if (p == "Create") page = _createPage;

    setState(() {
      _pageStr = p;
      _curPage = page;
    });
  }

  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        body: Column(
          children: [
            GroupAuthHeader(curPage: _pageStr, swapPage: swapPageUser),
            Divider(
                thickness: 5,
                indent: MediaQuery.of(context).size.width / 10,
                endIndent: MediaQuery.of(context).size.width / 10),
            GroupAuthPageBody(curPage: _curPage),
          ],
        ),
      ),
    );
  }
}
