import 'package:flat_out_app/core/jsons/fom_association.dart';
import 'package:json_annotation/json_annotation.dart';

import 'fom_component.dart';
import 'fom_event.dart';

part 'fom_group.g.dart';

@JsonSerializable()
class FomGroup extends FomComponent {
  List<FomEvent> groupCalendar;

  FomGroup(String id, String uiName, String fomVersion, String? avatar, List<FomAssociation> parents,
      List<FomAssociation> children, DateTime createdAt, DateTime updatedAt, this.groupCalendar)
      : super(id, uiName, fomVersion, avatar, parents, children, createdAt, updatedAt);

  factory FomGroup.fromJson(Map<String, dynamic> json) => _$FomGroupFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$FomGroupToJson(this);

  @override
  String toString() {
    return super.toString() + '\n \t FomGroup{groupCalendar: $groupCalendar}';
  }
}
