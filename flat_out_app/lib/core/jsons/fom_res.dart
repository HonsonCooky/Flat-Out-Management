import 'package:json_annotation/json_annotation.dart';

part 'fom_res.g.dart';

@JsonSerializable()
class FomRes {
  String msg;
  int? statusCode;
  dynamic item;

  FomRes(this.msg, this.statusCode, this.item);

  factory FomRes.fromJson(Map<String, dynamic> json) => _$FomResFromJson(json);

  @override
  String toString() {
    return 'FomRes{msg: $msg, statusCode: $statusCode, item: $item}';
  }
}
