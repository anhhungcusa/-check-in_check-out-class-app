const { default: types } = require("./types");

const setAuth = token => ({type: types.SET_AUTH, payload: {token}})
const setUser = user => ({type: types.SET_USER, payload: {user}})

export default {
    setAuth,
    setUser    
}
