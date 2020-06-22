import { axios } from "../configs";

const { default: types } = require("./types");

const setAuth = token => {
    axios.setAuthorization(token)
    const action = {type: types.SET_AUTH, payload: {token}}
    return action
}
const setUser = user => ({type: types.SET_USER, payload: {user}})
const setUsers = users => ({type: types.SET_USERS, payload: {users}})
const setRooms = rooms => ({type: types.SET_ROOMS, payload: {rooms}})
const addSession = session => ({type: types.ADD_SESSION, payload: {session}})

export default {
    setAuth,
    setUser,
    setUsers,
    setRooms,
    addSession 
}
