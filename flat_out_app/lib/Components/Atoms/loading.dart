import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Loading extends StatelessWidget {
  String? text;
  double _radMultiplier;

  Loading([this._radMultiplier = 1.0, this.text]);

  @override
  Widget build(BuildContext context) {
    double rad = (MediaQuery.of(context).size.width / 2) * _radMultiplier;

    return Center(
      child: SizedBox(
        height: rad,
        width: rad,
        child: CircularProgressIndicator(
          strokeWidth: 10 * (_radMultiplier * 2),
        ),
      ),
    );
  }
}
