import 'package:flat_out_app/Components/molecules/toast_page.dart';
import 'package:flutter/material.dart';

abstract class AuthPage extends ToastPage {
  Future<bool> attempt(BuildContext context);
}
