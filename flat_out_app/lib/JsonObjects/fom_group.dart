import 'package:flat_out_app/JsonObjects/fom_association.dart';
import 'package:flat_out_app/JsonObjects/fom_component.dart';
import 'package:flat_out_app/JsonObjects/fom_event.dart';
import 'package:json_annotation/json_annotation.dart';

part 'fom_group.g.dart';

@JsonSerializable()
class FomGroup extends FomComponent {
  List<FomEvent> groupCalendar;

  FomGroup(String id, String uiName, String fomVersion, List<FomAssociation> parents, List<FomAssociation> children,
      DateTime createdAt, DateTime updatedAt, this.groupCalendar)
      : super(id, uiName, fomVersion, parents, children, createdAt, updatedAt);


  factory FomGroup.fromJson(Map<String, dynamic> json) => _$FomGroupFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$FomGroupToJson(this);
}
