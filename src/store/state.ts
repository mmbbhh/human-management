export interface UserOptions {
    name?: string
    t_name?: string
    authority?: string
    department?: string
    authorityZh?: string
    password?: string
    tel?: string
    imgUrl?: string
}

export class User {
    user: any
    constructor(user: UserOptions) {
        this.user = user
    }
}

export interface State {
    user: UserOptions
    token?: string
    refresh?: string
}

export const state: State = {
    user: {},
    token: "",
    refresh: ""
}