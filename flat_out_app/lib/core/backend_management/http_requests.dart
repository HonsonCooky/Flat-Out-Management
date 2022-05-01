import 'dart:convert';

import 'package:flat_out_app/core/jsons/fom_association.dart';
import 'package:flat_out_app/core/jsons/fom_db_object.dart';
import 'package:flat_out_app/core/jsons/fom_res.dart';
import 'package:http/http.dart';

const String _base = "https://flat-out-management-api.herokuapp.com";

class FomReq {
  static FomRes _err = FomRes("Error: Something went wrong. Check your network connection", 500, null);

  /**
   * Alter the error messages from the HTTP request, to be user friendly.
   */
  static String _sanitizeErrorMsg(String msg) {
    String newMsg = msg;
    if (msg.contains("validation failed")) {
      List<String> com = msg
          .split(RegExp(r"[,:]"))
          .where((element) => element.toLowerCase().contains(RegExp(r'validation|path')))
          .map((e) => e.replaceAll(RegExp(r'path|Path'), "").trim())
          .map((e) => e.replaceAll("`name`", "Username"))
          .map((e) => e.replaceAll("`password`", "Password"))
          .map((e) => e.replaceAll("`uiName`", "Nickname"))
          .map((e) => "- ${e[0].toUpperCase() + e.substring(1).toLowerCase()}\n")
          .toList();
      newMsg = com.join('\n');
    }

    if (msg.contains("duplicate")) {
      List<String> com = msg.split("{");
      String san = com[1].replaceAll("}", "").trim();
      san = san.replaceAll("name", "Username");
      newMsg = "${san[0].toUpperCase() + san.substring(1).toLowerCase()} is already taken";
    }

    return newMsg;
  }

  /**
   * Translate a json response into the FomRes component (contractually given)
   */
  static FomRes _toFomRes<T extends FomDbObject>(Response res) {
    FomRes fRes = FomRes.fromJson(jsonDecode(res.body));
    fRes.statusCode = res.statusCode;
    fRes.msg = _sanitizeErrorMsg(fRes.msg);
    return fRes;
  }

  /**
   * Initiate a post request, given a sub url, body, and optional headers.
   */
  static Future<FomRes> _post(String subUrl, Map jsonBody, [String authHeader = ""]) async {
    Uri url = Uri.parse("$_base/api/$subUrl");
    try {
      Response res = await post(url,
          headers: {"Content-Type": "application/json", "Authorization": authHeader}, body: json.encode(jsonBody));
      return _toFomRes(res);
    } catch (_) {
      return _err;
    }
  }

  /**
   * Ping the heroku server to wake it up.
   */
  static Future<FomRes> ping() async {
    Uri url = Uri.parse("$_base");
    return _toFomRes(await get(url));
  }

  /**
   * Register a user with MongoDB.
   */
  static Future<FomRes> userRegister(String username, String nickname, String password) async {
    return _post('user/register', {
      'name': username.trim(),
      'uiName': nickname.trim().length > 0 ? nickname.trim() : null,
      'password': password.trim()
    });
  }

  /**
   * Register a group with MongoDB.
   */
  static Future<FomRes> groupRegister(String username, String password, String auth) async {
    return _post('group/register', {'name': username, 'password': password}, auth);
  }

  /**
   * Authenticate a user login, returning the FomUser as res.itm.
   */
  static Future<FomRes> userLogin(String username, String password) async {
    return _post('user/get', {'name': username, 'password': password});
  }

  /**
   * Access a group. Although the token is optional, it's not actually.
   */
  static Future<FomRes> groupGet(FomAssociation association, String token) async {
    return _post('group/${association.ref}/get', json.decode(""), token);
  }
}