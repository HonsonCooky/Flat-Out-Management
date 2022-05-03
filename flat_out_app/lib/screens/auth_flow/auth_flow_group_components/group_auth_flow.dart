import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_header.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_page_body.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_join_page.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_create_page.dart';
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
    FomUser? u = context.read<RuntimeCache>().user;
    
    return UnFocusWrapper(
      child: Scaffold(
        body: Column(
          children: [
            GroupAuthHeader(curPage: _pageStr, swapPage: swapPageUser),
            Divider(
                thickness: 5,
                indent: MediaQuery.of(context).size.width / 10,
                endIndent: MediaQuery.of(context).size.width / 10),
            Container(
              width: MediaQuery.of(context).size.width,
              padding: EdgeInsets.only(left: MediaQuery.of(context).size.width / 10),
              child: Text("User: ${u?.uiName ?? "unknown?"}", textAlign: TextAlign.start, style: Theme.of(context)
                  .textTheme.bodyText1,),
            ),
            GroupAuthPageBody(curPage: _curPage),
          ],
        ),
      ),
    );
  }
}
