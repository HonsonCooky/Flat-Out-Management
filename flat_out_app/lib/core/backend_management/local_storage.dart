import 'dart:io';

import 'package:flat_out_app/core/jsons/utils/enums.dart';
import 'package:path_provider/path_provider.dart';

class LocalStorage {
  static Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }

  static Future<File> _localFile({ModelType? partition, String? key = null}) async {
    final path = await _localPath;
    return File('$path${partition != null ? "/$partition" : ""}${key != null ? "/$key" : ""}');
  }

  static Future<Directory> _localDir({ModelType? partition}) async {
    return Directory("${partition}");
  }

  static Future<void> write({ModelType? partition, String? key, required String contents}) async {
    try {
      File f = await _localFile(partition: partition, key: key);
      f.writeAsStringSync(contents);
    } catch (_) {}
  }

  static Future<String?> read({ModelType? partition, String? key}) async {
    try {
      File f = await _localFile(partition: partition, key: key);
      return f.readAsStringSync();
    } catch (_) {
      return null;
    }
  }

  static Future<List<String>> readAll({ModelType? partition}) async {
    try {
      List<File> fs = (await _localDir(partition: partition)).listSync().whereType<File>().toList();
      return fs.map((e) => e.readAsStringSync()).toList();
    } catch (_) {
      return List.empty();
    }
  }

  static Future<void> delete({ModelType? partition, String? key}) async {
    try {
      File f = await _localFile(partition: partition, key: key);
      f.deleteSync();
    } catch (_) {}
  }

  static Future<void> deleteAll({required ModelType partition}) async {
    try {
      Directory dir = await _localDir(partition: partition);
      dir.deleteSync(recursive: true);
    } catch (_) {}
  }

  static Future<String> toDirString() async {
    final path = await _localPath;
    return Directory('$path').listSync(recursive: true).map((e) => e.absolute).toList().join("\n");
  }
}
