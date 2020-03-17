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

export enum RoleName {
    admin = "ROLE_ADMIN",
    agent = "ROLE_AGENT",
    client = "ROLE_CLIENT",
}