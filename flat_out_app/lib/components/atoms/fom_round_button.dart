import 'package:flutter/material.dart';

class FomRoundButton extends StatelessWidget {
  final List<Widget> children;
  final BorderRadius rad;
  final double width;
  final void Function() onPressed;

  const FomRoundButton(
      {Key? key, required this.children, required this.rad, required this.width, required this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(right: width),
      child: ElevatedButton(
        onPressed: () {
          onPressed();
        },
        child: Row(
          children: children,
        ),
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(borderRadius: rad),
          padding: EdgeInsets.all(7),
          elevation: 4,
        ),
      ),
    );
  }
}
