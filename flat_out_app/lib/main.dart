import 'package:flat_out_app/screens/fom_base.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/http_requests.dart';
import 'core/runtime_cache.dart';
import 'core/theme_notifier.dart';

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
