import 'package:json_annotation/json_annotation.dart';

import 'fom_association.dart';

part 'fom_db_object.g.dart';

@JsonSerializable()
class FomDbObject {
  @JsonKey(name: "_id") String id;
  String uiName;
  String fomVersion;
  List<FomAssociation> children;
  DateTime createdAt;
  DateTime updatedAt;

  FomDbObject(this.id, this.uiName, this.fomVersion, this.children, this.createdAt, this.updatedAt);

  factory FomDbObject.fromJson(Map<String, dynamic> json) => _$FomDbObjectFromJson(json);

  Map<String, dynamic> toJson() => _$FomDbObjectToJson(this);

  @override
  String toString() {
    return 'FomDbObject{id: $id, uiName: $uiName, fomVersion: $fomVersion, children: $children, createdAt: $createdAt, updatedAt: $updatedAt}';
  }
}
