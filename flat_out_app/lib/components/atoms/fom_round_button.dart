import 'package:flutter/material.dart';

class FomRoundButton extends StatelessWidget {
  final List<Widget> children;
  final BorderRadiusGeometry rad;
  final double width;
  final void Function() onPressed;

  const FomRoundButton(
      {Key? key, required this.children, required this.rad, required this.width, required this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(right: width, bottom: width / 20),
      child: MaterialButton(
        onPressed: () {
          onPressed();
        },
        child: Row(
          children: children,
        ),
        padding: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: rad,
        ),
        color: Theme.of(context).buttonTheme.colorScheme?.primary,
      ),
    );
  }
}
