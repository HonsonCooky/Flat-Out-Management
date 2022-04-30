import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flat_out_app/core/ui_functional_components/theme_notifier.dart';
import 'package:flat_out_app/screens/fom_base.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';


void main() {
  // The backend consists of a "free" tier heroku server. This means the server is shutdown after 30 minutes of 
  // inactivity. By pinging the server, the second the app is opened, actions made after the fact should do so will a
  // minimized display
  FomReq.ping();
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => ThemeNotifier()),
      ChangeNotifierProvider(create: (_) => RuntimeCache()),
    ],
    child: const FomBase(),
  ));
}