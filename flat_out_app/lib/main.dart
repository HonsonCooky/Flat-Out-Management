import 'package:flat_out_app/BusinessLogic/runtime_cache.dart';
import 'package:flat_out_app/BusinessLogic/theme_notifier.dart';
import 'package:flat_out_app/Fom_Pages/fom_base.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'BusinessLogic/http_requests.dart';

void main() {
  FomReq.ping();
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => ThemeNotifier()),
      ChangeNotifierProvider(create: (_) => RuntimeCache())
    ],
    child: const FomBase(),
  ));
}
