import 'package:json_annotation/json_annotation.dart';

import 'utils/enums.dart';

part 'fom_event.g.dart';

@JsonSerializable()
class FomEvent {
  DateTime date;
  EventType eType;
  String header;
  String message;
  String colorAssociation;

  FomEvent(this.date, this.eType, this.header, this.message, this.colorAssociation);

  factory FomEvent.fromJson(Map<String, dynamic> json) => _$FomEventFromJson(json);

  Map<String, dynamic> toJson() => _$FomEventToJson(this);

  @override
  String toString() {
    return 'FomEvent{date: $date, eType: $eType, header: $header, message: $message, colorAssociation: $colorAssociation}';
  }
}
