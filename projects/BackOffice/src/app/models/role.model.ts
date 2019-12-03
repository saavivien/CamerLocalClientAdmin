export class RoleModel {
    id: Number;
    roleName: string;
    displayedName: string;
}
export interface RoleResource {
    role: RoleModel,
    // link: string,
}
export interface RoleResources {
    roleResourceList: RoleResource[],
    // link: string,
}
export interface RoleResult {
    _embedded: RoleResources
}