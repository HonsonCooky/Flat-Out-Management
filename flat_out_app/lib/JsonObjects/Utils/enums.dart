enum ModelType { user, group, table }

enum RoleType {
  owner, // Authority to read/write/delete/alter associations
  write, // Authority to read/write
  read, // Authority to read
  request, // Asking for some level of authority
  mentioned // No role require
}

enum EventType {
  user,
  group,
  mentioned,
}

enum TimeIntervals { daily, weekly, monthly, annually }
