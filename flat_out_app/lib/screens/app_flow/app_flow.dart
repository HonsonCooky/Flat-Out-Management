import 'package:flat_out_app/core/backend_management/runtime_cache.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AppFlow extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AppFlowState();
}

class _AppFlowState extends State<AppFlow> {
  void logout() {
    context.read<RuntimeCache>().setUser(null);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Future.delayed(Duration.zero, logout);
          },
          child: Text("Logout"),
        ),
      ),
    );
  }
}
