import 'package:flat_out_app/components/utils/fom_theme.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/core/storage/runtime_cache.dart';
import 'package:flat_out_app/core/ui_functional_components/theme_notifier.dart';
import 'package:flat_out_app/screens/app_flow/app_flow.dart';
import 'package:flat_out_app/screens/auth_flow/auth_flow.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';


class FomBase extends StatefulWidget {
  const FomBase({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => FomBaseState();
}

class FomBaseState extends State {
  @override
  Widget build(BuildContext context) {
    FomUser? u = Provider.of<RuntimeCache>(context, listen: true).user;
    List<FomGroup> gs = Provider.of<RuntimeCache>(context, listen: true).groups;
    ThemeMode themeMode = Provider.of<ThemeNotifier>(context, listen: true).currentTheme();

    Widget flow = (u == null || gs.length == 0) ? AuthFlow() : AppFlow();

    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: FomThemes.light(),
        darkTheme: FomThemes.dark(),
        themeMode: themeMode,
        home: flow);
  }
}
