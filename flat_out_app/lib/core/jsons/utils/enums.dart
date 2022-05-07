

enum ModelType { user, group, table }
enum RoleType { owner, writer, reader, request, mentioned }
enum EventType { user, group, mentioned }
enum TimeIntervals { daily, weekly, monthly, annually }

extension ModelTypeExtension on RoleType {
  String get name {
    switch (this) {
      case RoleType.owner:
        return 'owner';
      case RoleType.writer:
        return 'flatmate';
      case RoleType.reader:
        return 'associate';
      case RoleType.request:
        return 'request';
      case RoleType.mentioned:
        return 'mentioned';
    }
  }
}
