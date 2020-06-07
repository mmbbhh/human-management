import { State } from "./state";

export const getters = {
  token(state: State) {
    if (state.token != "") {
      return state.token
    } else {
      return false
    }
  },

  refreshToken(state: State) {
    if (state.refresh != "") {
      return state.refresh
    } else {
      return false
    }
  }
}