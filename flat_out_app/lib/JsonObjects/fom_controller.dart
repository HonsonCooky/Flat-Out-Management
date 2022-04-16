import 'package:json_annotation/json_annotation.dart';

import 'fom_association.dart';

part 'fom_controller.g.dart';

@JsonSerializable()
class FomController {
  String id;
  String name;
  String uiName;
  String fomVersion;
  List<FomAssociation> parents;
  List<FomAssociation> children;
  DateTime createdAt;
  DateTime updatedAt;
  String token;


  FomController(this.id, this.name, this.uiName, this.fomVersion, this.parents, this.children, this.createdAt,
      this.updatedAt, this.token);

  factory FomController.fromJson(Map<String, dynamic> json) => _$FomControllerFromJson(json);

  Map<String, dynamic> toJson() => _$FomControllerToJson(this);
}
