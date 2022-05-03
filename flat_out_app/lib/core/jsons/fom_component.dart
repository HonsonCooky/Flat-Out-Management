import 'package:json_annotation/json_annotation.dart';

import 'fom_association.dart';
import 'fom_db_object.dart';

part 'fom_component.g.dart';

@JsonSerializable()
class FomComponent extends FomDbObject {
  List<FomAssociation> parents;

  FomComponent(id, uiName, fomVersion, children, this.parents, createdAt, updatedAt)
      : super(id, uiName, fomVersion, children, createdAt, updatedAt);

  factory FomComponent.fromJson(Map<String, dynamic> json) => _$FomComponentFromJson(json);

  Map<String, dynamic> toJson() => _$FomComponentToJson(this);

  @override
  String toString() {
    return super.toString() + '\n \t FomComponent{parents: $parents}';
  }
}
