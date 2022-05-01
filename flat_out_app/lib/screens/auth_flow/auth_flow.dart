import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_group_components/group_auth_flow.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_user_components/user_auth_flow.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthFlowState();
}

class _AuthFlowState extends State<AuthFlow> {
  @override
  Widget build(BuildContext context) {
    FomUser? u = Provider.of<RuntimeCache>(context, listen: true).user;
    Widget curFlow = u == null ? UserAuthFlow() : GroupAuthFlow();

    return AnimatedSwitcher(
      duration: Duration(milliseconds: 300),
      child: curFlow,
    );
  }
}
