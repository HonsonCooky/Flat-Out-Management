
import 'package:json_annotation/json_annotation.dart';

part 'fom_user_search_res.g.dart';

@JsonSerializable()
class FomUserSearchRes {
  @JsonKey(name: "_id") String id;
  String uiName;
  String name;
  String colorAssociation;
  
  FomUserSearchRes(this.id, this.uiName, this.name, this.colorAssociation);

  factory FomUserSearchRes.fromJson(Map<String, dynamic> json) => _$FomUserSearchResFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$FomUserSearchResToJson(this);

}