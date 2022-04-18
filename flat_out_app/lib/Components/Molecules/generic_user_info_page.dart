import 'package:flat_out_app/Components/Atoms/header_large.dart';
import 'package:flat_out_app/Components/Atoms/unfocus_wrapper.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class GenericUserInfoExtract extends StatelessWidget {
  final String title;
  final String btnText;
  final List<Widget> children;
  final Future<bool> Function() onSubmit;
  final double headerYElliptical = 50.0;

  GenericUserInfoExtract({required this.title, required this.children, required this.btnText, required this.onSubmit});
  
  Future<void> submit(BuildContext context) async {
    FocusScopeNode currentFocus = FocusScope.of(context);
    if (!currentFocus.hasPrimaryFocus) {
      currentFocus.unfocus();
    }
    bool success = await onSubmit();
  }

  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        body: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            HeaderLarge(title),
            Container(
              margin: EdgeInsets.symmetric(
                  horizontal: MediaQuery.of(context).size.width / 10,
                  vertical: MediaQuery.of(context).size.height / 20),
              child: Column(children: children),
            ),
            ElevatedButton(
              onPressed: () async => await submit(context),
              style: ButtonStyle(
                padding:
                    MaterialStateProperty.all(EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width / 4)),
              ),
              child: Text(btnText),
            ),
          ],
        ),
      ),
    );
  }
}
