export interface User {
  _id?: string;
  email: string;
  organization: string;
  nameOfUser: string;
  phoneNumber?: string;
  roles?: string[];
  password?: string;
}
