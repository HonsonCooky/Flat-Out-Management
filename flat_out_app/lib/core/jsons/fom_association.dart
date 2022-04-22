import 'package:json_annotation/json_annotation.dart';

import 'utils/enums.dart';

part 'fom_association.g.dart';

@JsonSerializable()
class FomAssociation {
  String ref;
  ModelType model;
  RoleType role;

  FomAssociation(this.ref, this.model, this.role);

  factory FomAssociation.fromJson(Map<String, dynamic> json) => _$FomAssociationFromJson(json);

  Map<String, dynamic> toJson() => _$FomAssociationToJson(this);

  @override
  String toString() {
    return 'FomAssociation{ref: $ref, model: $model, role: $role}';
  }
}
