import 'package:flutter/material.dart';

class FomRoundButton extends StatelessWidget {
  final IconData? icon;
  final String text;
  final double fontSize;
  final BorderRadiusGeometry rad;
  final double width;
  final void Function() onPressed;

  const FomRoundButton(
      {Key? key,
      required this.rad,
      required this.width,
      required this.onPressed,
      this.icon,
      required this.text,
      required this.fontSize})
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
          children: [
            Container(
              child: Icon(
                icon,
                size: fontSize,
              ),
              margin: EdgeInsets.only(right: 10),
            ),
            Text(
              text,
              style: TextStyle(fontSize: fontSize),
            )
          ],
        ),
        padding: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        shape: RoundedRectangleBorder(borderRadius: rad),
        color: Theme.of(context).buttonTheme.colorScheme?.primary.withOpacity(0.7),
      ),
    );
  }
}
