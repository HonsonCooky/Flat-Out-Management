import 'package:flat_out_app/Components/Atoms/loading.dart';
import 'package:flat_out_app/Fom_Pages/CustomPaint/blobs_background.dart';
import 'package:flutter/material.dart';

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => AuthPageState();
}

class AuthPageState extends State<AuthPage> {
  @override
  Widget build(BuildContext context) {
    return BlobBackground();
  }
}
