import 'package:json_annotation/json_annotation.dart';

import 'Utils/enums.dart';

part 'fom_association.g.dart';

@JsonSerializable()
class FomAssociation {
  String ref;
  ModelType model;
  RoleType role;

  FomAssociation(this.ref, this.model, this.role);

  factory FomAssociation.fromJson(Map<String, dynamic> json) => _$FomAssociationFromJson(json);

  Map<String, dynamic> toJson() => _$FomAssociationToJson(this);
}
