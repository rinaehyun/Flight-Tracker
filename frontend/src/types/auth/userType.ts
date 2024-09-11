export type NewBasicUser = {
    username: string,
    password: string,
    passwordConfirmation: string,
    role: string
}

export type BasicUser = {
    id: string,
    username: string,
    password: string,
    role: string
}

export type UserForLogin = {
    username: string,
    password: string,
}

export type User = {
    id: string,
    githubId: string,
    role: string,
}
