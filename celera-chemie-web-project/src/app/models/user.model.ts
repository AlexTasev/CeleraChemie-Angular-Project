export interface User {
  email: string;
  organization: string;
  nameOfUser: string;
  phoneNumber?: string;
  roles?: string[];
  password?: string;
}
