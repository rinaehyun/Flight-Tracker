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
    passwordConfirmation: string,
    role: string
}

export type User = {
    id: string,
    githubId: string,
    role: string,
}
