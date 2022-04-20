import 'package:flat_out_app/JsonObjects/Utils/enums.dart';
import 'package:json_annotation/json_annotation.dart';

part 'fom_table.g.dart';

@JsonSerializable()
class FomTableRotationConfig {
  int column;
  DateTime startDate;
  DateTime nextUpdate;
  double intervalValue;
  TimeIntervals intervalUnit;

  FomTableRotationConfig(this.column, this.startDate, this.nextUpdate, this.intervalValue, this.intervalUnit);

  factory FomTableRotationConfig.fromJson(Map<String, dynamic> json) => _$FomTableRotationConfigFromJson(json);

  Map<String, dynamic> toJson() => _$FomTableRotationConfigToJson(this);
}

@JsonSerializable()
class FomTable {
  int columns;
  List<int> fieldIndexes;
  List<dynamic> records;
  List<FomTableRotationConfig> rotations;

  FomTable(this.columns, this.fieldIndexes, this.records, this.rotations);

  factory FomTable.fromJson(Map<String, dynamic> json) => _$FomTableFromJson(json);

  Map<String, dynamic> toJson() => _$FomTableToJson(this);
}
