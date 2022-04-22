import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/screens/auth_flow/auth_home.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../components/utils/fom_theme.dart';
import '../core/jsons/fom_group.dart';
import '../core/runtime_cache.dart';
import '../core/theme_notifier.dart';
import 'app_flow/home/home.dart';

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
    
    // Find the base parent for current flow
    Widget flow = (u == null || gs.length == 0) ? AuthHomePage() : HomePage();
    final ThemeMode themeMode = Provider.of<ThemeNotifier>(context, listen: true).currentTheme();

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: FomThemes.light(),
      darkTheme: FomThemes.dark(),
      themeMode: themeMode,
      home: flow,
    );
  }
}
