import 'package:flat_out_app/JsonObjects/fom_association.dart';
import 'package:flat_out_app/JsonObjects/fom_controller.dart';
import 'package:flat_out_app/JsonObjects/fom_event.dart';
import 'package:json_annotation/json_annotation.dart';

part 'fom_user.g.dart';

@JsonSerializable()
class FomUser extends FomController {
  List<FomEvent> outOfFlatDates;
  String colorAssociation;

  FomUser(
      String id,
      String name,
      String uiName,
      String fomVersion,
      List<FomAssociation> children,
      DateTime createdAt,
      DateTime updatedAt,
      String token,
      this.outOfFlatDates,
      this.colorAssociation)
      : super(id, name, uiName, fomVersion, children, createdAt, updatedAt, token);

  factory FomUser.fromJson(Map<String, dynamic> json) => _$FomUserFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$FomUserToJson(this);
}
