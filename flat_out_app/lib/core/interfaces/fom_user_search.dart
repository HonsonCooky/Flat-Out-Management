import 'package:flat_out_app/core/interfaces/fom_user_search_res.dart';
import 'package:json_annotation/json_annotation.dart';

part 'fom_user_search.g.dart';

@JsonSerializable()
class FomUserSearch {
  List<FomUserSearchRes> users;

  FomUserSearch(this.users);
  
  factory FomUserSearch.fromJson(Map<String, dynamic> json) => _$FomUserSearchFromJson(json);
  
  @override
  Map<String, dynamic> toJson() => _$FomUserSearchToJson(this);

  @override
  String toString() {
    return 'FomUserSearch{users: $users}';
  }
}