import 'package:flat_out_app/core/http_requests.dart';
import 'package:flat_out_app/core/storage/runtime_cache.dart';
import 'package:flat_out_app/core/ui_functional_components/auth_page_notifier.dart';
import 'package:flat_out_app/core/ui_functional_components/theme_notifier.dart';
import 'package:flat_out_app/screens/fom_base.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';


void main() {
  FomReq.ping();
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => ThemeNotifier()),
      ChangeNotifierProvider(create: (_) => RuntimeCache()),
      ChangeNotifierProvider(create: (_) => AuthPageNotifier())
    ],
    child: const FomBase(),
  ));
}
