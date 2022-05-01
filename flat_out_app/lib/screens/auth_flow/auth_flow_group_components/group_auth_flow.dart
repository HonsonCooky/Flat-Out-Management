import 'package:flat_out_app/components/atoms/unfocus_wrapper.dart';
import 'package:flat_out_app/screens/auth_flow/no_group_alert.dart';
import 'package:flutter/material.dart';

class GroupAuthFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _GroupAuthFlow();
}

class _GroupAuthFlow extends State<GroupAuthFlow> {
  
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () => NoGroupAlert.showAlertDialog(context));
  }

  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text("GROUP", style: Theme.of(context).textTheme.headline2),
          ],
        ),
      ),
    );
  }
}
