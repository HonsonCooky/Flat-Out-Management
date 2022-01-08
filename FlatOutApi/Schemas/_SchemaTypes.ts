export const missingStr = (item: string) => `Missing ${item}`

// Names:
export const Id = {
  type: String,
  sparse: true,
  required: [true, missingStr('id')]
}

export const Name = {
  type: String,
  required: [true, missingStr('Name')],
  minLength: 3,
  maxLength: 20,
  trim: true
}

// Password: Not unique, else Hash+Salt doesn't work
export const Password = {
  type: String,
  required: [true, missingStr('Password')],
  minLength: 12,
}

// Session: A means of authentication without need for name and password, must be unique
export const Session = {
  type: String,
  unique: true,
  sparse: true
}

// Roles: A level of authority for a user in a group
export const Role = {
  type: String,
  enum: ['admin', 'flatmate', 'associate'],
  default: 'associate'
}

// Default boolean to true
export const DefaultTrue = {
  type: Boolean,
  default: true,
}
