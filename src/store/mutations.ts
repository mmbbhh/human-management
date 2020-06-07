import {State} from "./state";
import {User} from "./state";

export const mutations = {
    updateUser(state: State, payload: User) {
        state.user = payload.user
    },

    loginOut(state: State) {
        state.user = {
            name: ""
        },
        state.token = ""
    },

    addToken(state: State, payload: string) {
        state.token = payload
    },

    addRefresh(state: State, payload: string) {
        state.refresh = payload
    },

    changeImg(state: State, payload: string) {
        state.user.imgUrl = payload
    }
}