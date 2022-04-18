import 'package:path_provider/path_provider.dart';

class LocalStorage {  
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }
  
}
