export interface UserModel {
  id: Number,
  title: string,
  name: string,
  firstName: string,
  phone1: string;
  phone2: string;
  email: string;
  creationDate: Date,
  userCreator: UserModel,
  listUserRoles: Role[],
};
export interface Role {
  id: Number,
  roleName: string,
}
export interface UserResource {
  user: UserModel,
  // link: string,
}
export interface UserResources {
  userResourceList: UserResource[],
  // link: string,
}
export interface Result {
  _embedded: UserResources
}