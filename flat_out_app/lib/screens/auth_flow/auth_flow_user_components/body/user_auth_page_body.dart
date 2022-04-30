import 'package:flutter/material.dart';

class UserAuthPageBody extends StatelessWidget {
  final Widget curPage;
  
  UserAuthPageBody({required this.curPage});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: MediaQuery.of(context).size.width / 10,
            vertical: MediaQuery.of(context).size.height / 30,
          ),
          child: curPage,
        ),
      ),
    );
  }
}
