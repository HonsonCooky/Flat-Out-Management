import 'dart:io';

import 'package:path_provider/path_provider.dart';

enum Partition { USER, GROUP, TABLE }

class LocalStorage {
  static Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }

  static Future<File> _localFile(Partition partition, String key) async {
    final path = await _localPath;
    return File('$path/$partition/$key');
  }

  static Future<Directory> _localDir(Partition partition) async {
    final path = await _localPath;
    return Directory("$partition");
  }

  static Future<void> write(Partition partition, String key, String contents) async {
    File f = await _localFile(partition, key);
    f.writeAsStringSync(contents);
  }

  static Future<String> read(Partition partition, String key) async {
    File f = await _localFile(partition, key);
    return f.readAsString();
  }

  static Future<List<String>> readAll(Partition partition) async {
    List<File> fs = (await _localDir(partition)).listSync().whereType<File>().toList();
    return fs.map((e) => e.readAsStringSync()).toList();
  }

  static Future<void> delete(Partition partition, String key) async {
    File f = await _localFile(partition, key);
    f.deleteSync();
  }

  static Future<void> deleteAll(Partition partition, String key) async {
    Directory dir = await _localDir(partition);
    dir.deleteSync(recursive: true);
  }
}
