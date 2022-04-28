import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow_components/auth_page_body.dart';
import 'package:flutter/material.dart';

import 'auth_flow_components/auth_header.dart';

class AuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AuthFlowState();
}

class _AuthFlowState extends State<AuthFlow> {
  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        body: Column(
          children: [
            AuthHeader(),
            Divider(
                thickness: 5,
                indent: MediaQuery.of(context).size.width / 10,
                endIndent: MediaQuery.of(context).size.width / 10),
            AuthPageBody(),
          ],
        ),
      ),
    );
  }
}
