import 'dart:convert';

import 'package:flat_out_app/core/backend_management/local_storage.dart';
import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_table.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/core/jsons/utils/enums.dart';
import 'package:flutter/cupertino.dart';

class RuntimeCache extends ChangeNotifier {
  FomUser? _user;
  List<FomGroup> _groups = [];
  List<FomTable> _tables = [];
  bool _hasUnloadedGroups = false;

  FomUser? get user => _user;

  List<FomGroup> get groups => _groups;

  List<FomTable> get tables => _tables;

  bool get hasUnloadedGroups => _hasUnloadedGroups;

  Future<void> _clearAll() async {
    _user = null;
    _groups = [];
    _tables = [];
    _hasUnloadedGroups = false;
    LocalStorage.delete(Partition.USER);
    LocalStorage.deleteAll(Partition.GROUP).catchError((e) {});
    LocalStorage.deleteAll(Partition.TABLE).catchError((e) {});
  }

  /**
   * This method sets the runtime user. If the value is null then all local storage will be cleared.
   * If the user has
   */
  Future<void> setUser(FomUser? value) async {
    _clearAll();

    if (value != null) {
      LocalStorage.write(Partition.USER, jsonEncode(value)).catchError((e) {});
      _user = value;
      _hasUnloadedGroups = value.children
          .where((element) => element.model == ModelType.group && element.role.index >= RoleType.read.index)
          .toList()
          .length >
          0;
    }
    notifyListeners();
  }

  Future<void> loadUser() async {
    if (_user == null) {
      throw Exception("A user has not been loaded. Cannot load values");
    } else {
      var g = Future.wait(_user!.children
          .where((element) => element.model == ModelType.group)
          .map((e) async => await FomReq.groupGet(e, _user?.token)));
    }
  }

  Future<void> init([Function? onErr = null]) async {
    try {
      _user = FomUser.fromJson(json.decode(await LocalStorage.read(Partition.USER)));
    } catch (e) {}
    try {
      _groups = (await LocalStorage.readAll(Partition.GROUP)).map((e) => FomGroup.fromJson(jsonDecode(e))).toList();
    } catch (e) {}
    try {
      _tables = (await LocalStorage.readAll(Partition.TABLE)).map((e) => FomTable.fromJson(jsonDecode(e))).toList();
    } catch (e) {}
    notifyListeners();
  }
}
