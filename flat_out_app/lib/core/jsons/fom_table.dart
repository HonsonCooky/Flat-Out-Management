import 'package:flat_out_app/core/jsons/fom_association.dart';
import 'package:json_annotation/json_annotation.dart';

import 'fom_component.dart';
import 'utils/enums.dart';

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

  @override
  String toString() {
    return 'FomTableRotationConfig{column: $column, startDate: $startDate, nextUpdate: $nextUpdate, intervalValue: $intervalValue, intervalUnit: $intervalUnit}';
  }
}

@JsonSerializable()
class FomTable extends FomComponent {
  int columns;
  List<int> fieldIndexes;
  List<dynamic> records;
  List<FomTableRotationConfig> rotations;

  FomTable(
      String id,
      String uiName,
      String fomVersion,
      String? avatar,
      List<FomAssociation> parents,
      List<FomAssociation> children,
      DateTime createdAt,
      DateTime updatedAt,
      this.columns,
      this.fieldIndexes,
      this.records,
      this.rotations)
      : super(id, uiName, fomVersion, avatar, parents, children, createdAt, updatedAt);

  factory FomTable.fromJson(Map<String, dynamic> json) => _$FomTableFromJson(json);

  Map<String, dynamic> toJson() => _$FomTableToJson(this);

  @override
  String toString() {
    return super.toString() +
        '\n \t FomTable{columns: $columns, fieldIndexes: $fieldIndexes, records: $records, '
            'rotations: $rotations}';
  }
}
