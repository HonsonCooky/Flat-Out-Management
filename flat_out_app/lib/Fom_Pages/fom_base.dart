import 'package:flat_out_app/BusinessLogic/runtime_cache.dart';
import 'package:flat_out_app/Fom_Pages/AppFlow/home.dart';
import 'package:flat_out_app/Fom_Pages/AuthFlow/login_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../BusinessLogic/theme_notifier.dart';
import '../Components/Utils/fom_theme.dart';

class FomBase extends StatefulWidget {
  const FomBase({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _FomBaseState();
}

class _FomBaseState extends State<StatefulWidget> {
  Widget home = runtimeCache.user != null ? HomePage() : LoginPage();
  
  @override
  void initState() {
    super.initState();
    themeNotifier.addListener(() {
      setState(() {});
    });
    runtimeCache.addListener(() {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: FomThemes.light(),
      darkTheme: FomThemes.dark(),
      themeMode: themeNotifier.currentTheme(),
      home: SafeArea(child: home),
    );
  }
}
