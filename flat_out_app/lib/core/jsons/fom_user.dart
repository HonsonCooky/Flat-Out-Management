import 'package:json_annotation/json_annotation.dart';

import 'fom_association.dart';
import 'fom_controller.dart';
import 'fom_event.dart';

part 'fom_user.g.dart';

@JsonSerializable()
class FomUser extends FomController {
  List<FomEvent> outOfFlatDates;
  String colorAssociation;

  FomUser(String id, String name, String uiName, String fomVersion, List<FomAssociation> children, DateTime createdAt,
      DateTime updatedAt, String token, this.outOfFlatDates, this.colorAssociation)
      : super(id, name, uiName, fomVersion, children, createdAt, updatedAt, token);

  factory FomUser.fromJson(Map<String, dynamic> json) => _$FomUserFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$FomUserToJson(this);

  @override
  String toString() {
    return super.toString() + '\n \t FomUser{outOfFlatDates: $outOfFlatDates, colorAssociation: $colorAssociation}';
  }
}
