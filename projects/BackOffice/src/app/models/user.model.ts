import { RoleModel } from './role.model';

export class UserModel {
  id: Number;
  title: string;
  name: string;
  firstName: string;
  phone1: string;
  phone2: string;
  email: string;
  password: string;
  creationDate: Date;
  userCreator: UserModel;
  roles: RoleModel[];

  public roleList = (values: RoleModel[]) => {
    this.roles = values;
  }

};
export interface UserResource {
  user: UserModel,
  image: string
  // link: string,
}
export interface UserResources {
  userResourceList: UserResource[],
  // link: string,
}
export interface UserResult {
  _embedded: UserResources
}