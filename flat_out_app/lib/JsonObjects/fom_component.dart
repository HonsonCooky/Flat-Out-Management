import 'package:json_annotation/json_annotation.dart';

import 'fom_association.dart';

part 'fom_component.g.dart';

@JsonSerializable()
class FomComponent {
  String id;
  String uiName;
  String fomVersion;
  List<FomAssociation> parents;
  List<FomAssociation> children;
  DateTime createdAt;
  DateTime updatedAt;

  FomComponent(this.id, this.uiName, this.fomVersion, this.parents, this.children, this.createdAt, this.updatedAt);

  factory FomComponent.fromJson(Map<String, dynamic> json) => _$FomComponentFromJson(json);

  Map<String, dynamic> toJson() => _$FomComponentToJson(this);
  
}