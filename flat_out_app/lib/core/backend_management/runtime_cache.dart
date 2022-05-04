import 'dart:convert';

import 'package:flat_out_app/core/backend_management/http_requests.dart';
import 'package:flat_out_app/core/backend_management/local_storage.dart';
import 'package:flat_out_app/core/jsons/fom_group.dart';
import 'package:flat_out_app/core/jsons/fom_res.dart';
import 'package:flat_out_app/core/jsons/fom_table.dart';
import 'package:flat_out_app/core/jsons/fom_user.dart';
import 'package:flat_out_app/core/jsons/utils/enums.dart';
import 'package:flutter/cupertino.dart';

const String noGroupKey = 'no_group';

class RuntimeCache extends ChangeNotifier {
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
   */
  Future<void> setUser(FomUser? user) async {
    _clearAll();

    if (user != null) {
      _user = user;
      await loadUser();
      LocalStorage.write(partition: ModelType.user, contents: jsonEncode(user)).catchError((e) {});
    }

    notifyListeners();
  }

  /**
   * Loads the user's children into their respective lists.
   */
  Future<void> loadUser() async {
    if (_user != null) {
      List<FomRes> gs = await Future.wait(_user!.children
          .where((element) =>
              element.model == ModelType.group &&
              !(element.role == RoleType.request || element.role == RoleType.mentioned))
          .map((e) async => await FomReq.groupGet(e, _user!.token))
          .toList());

      for (int i = 0; i < gs.length; i++) {
        await addGroup(FomGroup.fromJson(gs[i].item));
      }
    }
  }

  /**
   * Adds a group to the runtime cache, and to local storage
   */
  Future<void> addGroup(FomGroup group) async {
    _groups.add(group);
    _cacheReady = _user != null;
    LocalStorage.write(partition: ModelType.group, key: group.id, contents: jsonEncode(group));
    notifyListeners();
  }

  /**
   * Allow group creation and selection to be skipped.
   */
  Future<void> readyCache() async {
    _cacheReady = true;
    await LocalStorage.write(key: noGroupKey, contents: 'true');
    notifyListeners();
  }

  /**
   * Gets all information from local storage, and sets it to it's respective values.
   */
  Future<void> init([Function? onErr = null]) async {
    String? u = await LocalStorage.read(partition: ModelType.user);
    _user = u != null ? FomUser.fromJson(jsonDecode(u)) : null;
    _groups =
        (await LocalStorage.readAll(partition: ModelType.group)).map((e) => FomGroup.fromJson(jsonDecode(e))).toList();
    _tables =
        (await LocalStorage.readAll(partition: ModelType.table)).map((e) => FomTable.fromJson(jsonDecode(e))).toList();
    _cacheInit = true;

    String? noGroup = await LocalStorage.read(key: noGroupKey);
    _cacheReady = noGroup != null ? noGroup == 'true' : false;
    notifyListeners();
  }
}
