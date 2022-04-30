import 'dart:convert';

import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_table.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/core/storage/local_storage.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart';

class RuntimeCache extends ChangeNotifier {
  static FomUser? _user;
  static List<FomGroup> _groups = [];
  static List<FomTable> _tables = [];

  FomUser? get user => _user;

  List<FomGroup> get groups => _groups;

  List<FomTable> get tables => _tables;
  
  Future<void> _clearAll() async {
    _user = null;
    _groups = [];
    _tables = [];
    LocalStorage.delete(Partition.USER);
    LocalStorage.deleteAll(Partition.GROUP).catchError((e) {});
    LocalStorage.deleteAll(Partition.TABLE).catchError((e) {});
  }

  Future<void> setUser(FomUser? value) async {
    _clearAll();
    LocalStorage.write(Partition.USER, jsonEncode(value)).catchError((e){});
    _user = value;
    notifyListeners();
  }

  Future<void> addGroup(FomGroup value) async {
    try {
      _groups.add(value);
      await LocalStorage.write(Partition.GROUP, jsonEncode(value), "/${value.id}");
    } catch (e) {
      throw ClientException("Unable to access local storage\n${e}");
    }
    notifyListeners();
  }

  Future<void> addTable(FomTable value, [Function? onErr = null]) async {
    try {
      _tables.add(value);
      await LocalStorage.write(Partition.TABLE, jsonEncode(value), "/${value.id}");
    } catch (e) {
      throw ClientException("Unable to access local storage\n${e}");
    }
    notifyListeners();
  }

  Future<void> init([Function? onErr = null]) async {
    try {
      FomUser? user = FomUser.fromJson(json.decode(await LocalStorage.read(Partition.USER)));
      List<FomGroup> groups =
          (await LocalStorage.readAll(Partition.GROUP)).map((e) => FomGroup.fromJson(jsonDecode(e))).toList();
      List<FomTable> tables =
          (await LocalStorage.readAll(Partition.TABLE)).map((e) => FomTable.fromJson(jsonDecode(e))).toList();

      _user = user;
      _groups = groups;
      _tables = tables;
    } catch (e) {
      throw ClientException("Unable to access local storage\n${e}");
    }
    notifyListeners();
  }
}
