import 'package:flutter/material.dart';

class GroupAuthPageBody extends StatelessWidget {
  final Widget curPage;

  GroupAuthPageBody({required this.curPage});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Scrollbar(
        child: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.symmetric(
              horizontal: MediaQuery.of(context).size.width / 10,
              vertical: MediaQuery.of(context).size.height / 30,
            ),
            child: curPage,
          ),
        ),
      ),
    );
  }
}
