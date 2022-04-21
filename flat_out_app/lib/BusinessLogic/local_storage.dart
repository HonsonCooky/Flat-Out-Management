import 'dart:io';

import 'package:path_provider/path_provider.dart';

enum Partition { USER, GROUP, TABLE }

class LocalStorage {
  static Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }

  static Future<File> _localFile(Partition partition, [String? key = null]) async {
    final path = await _localPath;
    return File('$path/${partition}${key != null ? "/$key" : ""}');
  }

  static Future<Directory> _localDir(Partition partition) async {
    return Directory("${partition}");
  }

  static Future<void> write(Partition partition, String contents, [String? key = null]) async {
    File f = await _localFile(partition, key);
    f.writeAsStringSync(contents);
  }

  static Future<String> read(Partition partition, [String? key = null]) async {
    try {
      File f = await _localFile(partition, key);
      return f.readAsString();
    } catch (_) {
      return "";
    }
  }

  static Future<List<String>> readAll(Partition partition) async {
    try {
      List<File> fs = (await _localDir(partition)).listSync().whereType<File>().toList();
      return fs.map((e) => e.readAsStringSync()).toList();
    } catch (_) {
      return List.empty();
    }
  }

  static Future<void> delete(Partition partition, [String? key = null]) async {
    File f = await _localFile(partition, key);
    try {
      f.deleteSync();
    } catch (_) {}
  }

  static Future<void> deleteAll(Partition partition) async {
    try {
      Directory dir = await _localDir(partition);
      dir.deleteSync(recursive: true);
    } catch (e) {}
  }

  static Future<String> toDirString() async {
    final path = await _localPath;
    return Directory('$path').listSync(recursive: true).map((e) => e.absolute).toList().join("\n");
  }
}
