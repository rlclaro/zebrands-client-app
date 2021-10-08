export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  created?: string;
  role? : Role;
  idcreated?: string;
}

export enum Role {
  Admin = 0,
  Anonymous = 1
}


export class UserAdd {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRole? : string;
}
