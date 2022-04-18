import 'package:json_annotation/json_annotation.dart';

part 'fom_res.g.dart';

@JsonSerializable()
class FomRes {
  String msg;
  dynamic item;

  FomRes(this.msg, this.item);

  factory FomRes.fromJson(Map<String, dynamic> json) => _$FomResFromJson(json);
}
