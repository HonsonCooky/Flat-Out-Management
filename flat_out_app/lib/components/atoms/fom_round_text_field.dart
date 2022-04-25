import 'package:flutter/material.dart';

class FomRoundTextField extends StatelessWidget {
  final BorderRadius rad;
  final String hint;
  final double width;
  final TextStyle style;

  FomRoundTextField({required this.rad, required this.hint, required this.width, required this.style});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(right: width, bottom: width / 20),
      child: TextField(
        decoration: InputDecoration(
            contentPadding: EdgeInsets.only(),
            border: OutlineInputBorder(borderRadius: rad, borderSide: BorderSide(color: Colors.black38, width: 5)),
            hintStyle: style,
            hintText: hint,
            fillColor: Colors.white70),
      ),
    );
  }
}
