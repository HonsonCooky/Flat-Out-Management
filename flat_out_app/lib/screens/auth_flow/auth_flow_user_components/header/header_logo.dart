import 'package:flutter/material.dart';

class HeaderLogo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double? iconSize = Theme.of(context).textTheme.headline1?.fontSize;
    if (iconSize != null)
      iconSize = iconSize * 2;
    else
      iconSize = 100;

    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height / 3.5,
      padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 10),
      color: Theme.of(context).dividerColor,
      child: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.symmetric(horizontal: 10),
              child: Icon(
                Icons.real_estate_agent_outlined,
                color: Theme.of(context).scaffoldBackgroundColor,
                size: iconSize,
              ),
            ),
            Flexible(
              child: Text(
                "Flat-Out Management",
                textAlign: TextAlign.left,
                style: Theme.of(context).textTheme.headline3,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
