export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  created?: string;
  role? : Role;
  idcreated?: string;
}

enum Role {
  Admin,
  Anonymous
}
