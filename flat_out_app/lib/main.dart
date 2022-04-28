import 'package:flat_out_app/core/blocs/auth_page_notifier.dart';
import 'package:flat_out_app/screens/fom_base.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/blocs/http_requests.dart';
import 'core/blocs/runtime_cache.dart';
import 'core/blocs/theme_notifier.dart';

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
