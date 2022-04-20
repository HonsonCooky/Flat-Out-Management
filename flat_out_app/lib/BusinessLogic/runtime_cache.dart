import 'dart:convert';

import 'package:flat_out_app/JsonObjects/fom_group.dart';
import 'package:flat_out_app/JsonObjects/fom_table.dart';
import 'package:flat_out_app/JsonObjects/fom_user.dart';
import 'package:flutter/cupertino.dart';

import 'local_storage.dart';

class RuntimeCache extends ChangeNotifier {
  static FomUser? _user;
  static List<FomGroup> _groups = [];
  static List<FomTable> _tables = [];

  FomUser? get user => _user;

  List<FomGroup> get groups => _groups;

  List<FomTable> get tables => _tables;

  void setUser(FomUser? value) {
    _user = value;
    notifyListeners();
  }

  void addGroup(FomGroup value) {
    _groups.add(value);
    notifyListeners();
  }

  void addTable(FomTable value) {
    _tables.add(value);
    notifyListeners();
  }

  Future<void> init() async {
    FomUser? user = FomUser.fromJson(json.decode(await LocalStorage.read(Partition.USER, "")));
    List<FomGroup> groups =
        (await LocalStorage.readAll(Partition.GROUP)).map((e) => FomGroup.fromJson(json.decode(e))).toList();
    List<FomTable> tables =
        (await LocalStorage.readAll(Partition.TABLE)).map((e) => FomTable.fromJson(json.decode(e))).toList();

    _user = user;
    _groups = groups;
    _tables = tables;
    print(_user);
    notifyListeners();
  }
}
