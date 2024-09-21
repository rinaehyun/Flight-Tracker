export type NewBasicUser = {
    username: string,
    password: string,
    passwordConfirmation: string,
    role: UserRole
}

export type BasicUser = {
    id: string,
    username: string,
    role: UserRole
}

export type FetchedUser = {
    username: string,
    password: string,
    role: UserRole
}

export type UserForLogin = {
    username: string,
    password: string,
}

export type User = {
    id: string,
    githubId: string,
    role: UserRole,
}

export type UserRole = "ADMIN" | "EMPLOYEE" | "USER";

export const UserRoleList : UserRole[] = ["ADMIN", "EMPLOYEE", "USER"];