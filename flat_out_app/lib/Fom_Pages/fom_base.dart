import 'package:flat_out_app/BusinessLogic/runtime_cache.dart';
import 'package:flat_out_app/Fom_Pages/AppFlow/home/home.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/auth_router.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../BusinessLogic/theme_notifier.dart';
import '../Components/Utils/fom_theme.dart';

class FomBase extends StatefulWidget {
  const FomBase({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => FomBaseState();
}

class FomBaseState extends State {
  @override
  Widget build(BuildContext context) {
    Widget flow = Provider.of<RuntimeCache>(context, listen: true).user != null &&
            Provider.of<RuntimeCache>(context, listen: true).groups.length > 0
        ? HomePage()
        : AuthRouter();
    final ThemeMode themeMode = Provider.of<ThemeNotifier>(context, listen: true).currentTheme();

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: FomThemes.light(),
      darkTheme: FomThemes.dark(),
      themeMode: themeMode,
      home: SafeArea(child: flow),
    );
  }
}
