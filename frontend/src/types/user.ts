export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

enum Role {
  ADMIN,
  MANAGER,
  OPERATOR,
}
