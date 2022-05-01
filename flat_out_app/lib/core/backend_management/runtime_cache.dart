import 'dart:convert';

import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/backend_management/local_storage.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_table.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/core/jsons/utils/enums.dart';
import 'package:flutter/cupertino.dart';

class RuntimeCache extends ChangeNotifier {
  final noGroupKey = 'no_group';
  FomUser? _user;
  List<FomGroup> _groups = [];
  List<FomTable> _tables = [];
  bool _cacheInit = false;
  bool _cacheReady = false;

  FomUser? get user => _user;

  List<FomGroup> get groups => _groups;

  List<FomTable> get tables => _tables;

  bool get cacheInit => _cacheInit;

  bool get cacheReady => _cacheReady;

  Future<void> _clearAll() async {
    _user = null;
    _groups = [];
    _tables = [];
    _cacheReady = false;
    LocalStorage.delete(partition: ModelType.user);
    LocalStorage.delete(key: noGroupKey);
    LocalStorage.deleteAll(partition: ModelType.group).catchError((e) {});
    LocalStorage.deleteAll(partition: ModelType.table).catchError((e) {});
  }

  /**
   * This method sets the runtime user. If the value is null then all local storage will be cleared.
   * If the user has
   */
  Future<void> setUser(FomUser? value) async {
    _clearAll();

    if (value != null) {
      LocalStorage.write(partition: ModelType.user, contents: jsonEncode(value)).catchError((e) {});
      _user = value;
      await loadUser();
    }

    notifyListeners();
  }

  Future<void> loadUser() async {
    if (_user == null) {
      throw Exception("A user has not been loaded. Cannot load values");
    } else {
      var g = await Future.wait(_user!.children
          .where((element) => element.model == ModelType.group)
          .map((e) async => await FomReq.groupGet(e, _user!.token)));
      print(g);
    }
  }

  Future<void> prematureReady() async {
    _cacheReady = true;
    await LocalStorage.write(key: noGroupKey, contents: 'true');
    notifyListeners();
  }

  Future<void> init([Function? onErr = null]) async {
    String? u = await LocalStorage.read(partition: ModelType.user);
    _user = u != null ? FomUser.fromJson(json.decode(u)) : null;
    _groups = (await LocalStorage.readAll(partition: ModelType.group)).map((e) => FomGroup.fromJson(jsonDecode(e))).toList();
    _tables = (await LocalStorage.readAll(partition: ModelType.table)).map((e) => FomTable.fromJson(jsonDecode(e))).toList();
    _cacheInit = true;

    String? noGroup = await LocalStorage.read(key: noGroupKey);
    _cacheReady = noGroup != null ? noGroup == 'true' : false;
    notifyListeners();
  }
}
