import 'package:json_annotation/json_annotation.dart';

part 'fom_search_parents.g.dart';

@JsonSerializable()
class FomSearchParents {
  @JsonKey(name: "_id")
  String id;
  String uiName;

  FomSearchParents(this.id, this.uiName);

  factory FomSearchParents.fromJson(Map<String, dynamic> json) => _$FomSearchParentsFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$FomSearchParentsToJson(this);

  @override
  String toString() {
    return 'FomSearchParents{id: $id, uiName: $uiName}';
  }
}
