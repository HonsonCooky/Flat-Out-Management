
import 'package:flat_out_app/screens/auth_flow/choices_page.dart';
import 'package:flutter/material.dart';

import '../../components/molecules/blobs_background.dart';

class AuthHomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => AuthHomePageState();
}

class AuthHomePageState extends State<AuthHomePage> {
  static Widget _curPage = ChoicesPage();
  
  @override
  Widget build(BuildContext context) {

    return BlobBackground(
      child: _curPage
    );
  }
}
