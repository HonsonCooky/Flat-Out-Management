import 'dart:convert';

import 'package:flutter/cupertino.dart';

import '../../core/jsons/fom_group.dart';
import '../../core/jsons/fom_table.dart';
import '../../core/jsons/fom_user.dart';
import 'local_storage.dart';

class RuntimeCache extends ChangeNotifier {
  static FomUser? _user;
  static List<FomGroup> _groups = [];
  static List<FomTable> _tables = [];

  FomUser? get user => _user;

  List<FomGroup> get groups => _groups;

  List<FomTable> get tables => _tables;

  Future<RuntimeCache> setUser(FomUser? value, [Function? onErr = null]) async {
    try {
      _user = value;
      if (value == null) {
        await LocalStorage.delete(Partition.USER);
        await LocalStorage.deleteAll(Partition.GROUP);
        await LocalStorage.deleteAll(Partition.TABLE);
        _user = null;
        _groups = [];
        _tables = [];
      } else {
        await LocalStorage.write(Partition.USER, json.encode(value));
      }
    } catch (_) {
      if (onErr != null) onErr();
    }
    print(await LocalStorage.toDirString());
    notifyListeners();
    return this;
  }

  Future<RuntimeCache> addGroup(FomGroup value, [Function? onErr = null]) async {
    try {
      _groups.add(value);
      await LocalStorage.write(Partition.GROUP, json.encode(value), "/${value.id}");
    } catch (_) {
      if (onErr != null) onErr();
    }
    notifyListeners();
    return this;
  }

  Future<RuntimeCache> addTable(FomTable value, [Function? onErr = null]) async {
    try {
      _tables.add(value);
      await LocalStorage.write(Partition.TABLE, json.encode(value), "/${value.id}");
    } catch (_) {
      if (onErr != null) onErr();
    }
    notifyListeners();
    return this;
  }

  Future<RuntimeCache> init([Function? onErr = null]) async {
    try {
      FomUser? user = FomUser.fromJson(json.decode(await LocalStorage.read(Partition.USER)));
      List<FomGroup> groups =
          (await LocalStorage.readAll(Partition.GROUP)).map((e) => FomGroup.fromJson(json.decode(e))).toList();
      List<FomTable> tables =
          (await LocalStorage.readAll(Partition.TABLE)).map((e) => FomTable.fromJson(json.decode(e))).toList();

      _user = user;
      _groups = groups;
      _tables = tables;
    } catch (e) {
      if (onErr != null) onErr();
    }
    notifyListeners();
    return this;
  }
}
