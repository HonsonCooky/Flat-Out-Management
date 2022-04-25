import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/screens/app_flow/app_flow.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../components/utils/fom_theme.dart';
import '../core/jsons/fom_group.dart';
import '../core/runtime_cache.dart';
import '../core/theme_notifier.dart';

class FomBase extends StatefulWidget {
  const FomBase({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => FomBaseState();
}

class FomBaseState extends State {
  @override
  Widget build(BuildContext context) {
    // Connect to providers
    FomUser? u = Provider.of<RuntimeCache>(context, listen: true).user;
    List<FomGroup> gs = Provider.of<RuntimeCache>(context, listen: true).groups;
    ThemeMode themeMode = Provider.of<ThemeNotifier>(context, listen: true).currentTheme();

    // Find the base parent for current flow
    Widget flow = (u == null || gs.length == 0) ? AuthFlow() : AppFlow();

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: FomThemes.light(),
      darkTheme: FomThemes.dark(),
      themeMode: themeMode,
      home: flow,
    );
  }
}
