import 'package:flat_out_app/JsonObjects/fom_group.dart';
import 'package:flat_out_app/JsonObjects/fom_table.dart';
import 'package:flat_out_app/JsonObjects/fom_user.dart';
import 'package:flutter/cupertino.dart';

class _RuntimeCache extends ChangeNotifier {
  static FomUser? _user;
  static List<FomGroup> _groups = [];
  static List<FomTable> _tables = [];

  FomUser? get user => _user;
  List<FomGroup> get groups => _groups;
  List<FomTable> get tables => _tables;
  
  bool setUser(FomUser value){
    _user = value;
    notifyListeners();
    return true;
  }
}

final _RuntimeCache runtimeCache = _RuntimeCache();