import 'package:flat_out_app/core/jsons/fom_association.dart';
import 'package:json_annotation/json_annotation.dart';

import 'fom_db_object.dart';

part 'fom_controller.g.dart';

@JsonSerializable()
class FomController extends FomDbObject {
  String name;
  String token;

  FomController(String id, this.name, String uiName, String fomVersion, String? avatar, List<FomAssociation> children,
      DateTime createdAt, DateTime updatedAt, this.token)
      : super(id, uiName, fomVersion, avatar, children, createdAt, updatedAt);

  factory FomController.fromJson(Map<String, dynamic> json) => _$FomControllerFromJson(json);

  Map<String, dynamic> toJson() => _$FomControllerToJson(this);

  @override
  String toString() {
    return super.toString() + '\n \t FomController{name: $name, token: $token}';
  }
}
