import 'package:flutter/material.dart';

class HeaderLogo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.only(top: MediaQuery.of(context).size.height / 20),
      color: Theme.of(context).dividerColor,
      child: Column(
        children: [
          Icon(
            Icons.real_estate_agent_outlined,
            color: Theme.of(context).scaffoldBackgroundColor,
            size: MediaQuery.of(context).size.height / 10,
          ),
          Text(
            "Flat-Out Management",
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.headline3,
          ),
        ],
      ),
    );
  }
}
