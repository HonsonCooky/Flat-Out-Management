import 'package:flutter/material.dart';

void main() {
  runApp(const FOM());
}

class FOM extends StatelessWidget {
  const FOM({Key? key}) : super(key: key);
  
  

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Login"),
        ),
      ),
    );
  }
  
}