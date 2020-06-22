import { axios } from "../configs";

const { default: types } = require("./types");

const setAuth = token => {
    axios.setAuthorization(token)
    const action = {type: types.SET_AUTH, payload: {token}}
    return action
}
const setUser = user => ({type: types.SET_USER, payload: {user}})

const resetAuth = () => ({type: types.RESET_AUTH})

export default {
    setAuth,
    setUser,
    resetAuth
}
