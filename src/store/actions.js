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
const setSessions = sessions => ({type: types.SET_SESSIONS, payload: {sessions}})
const addRoom = room => ({type: types.ADD_ROOM, payload: {room}})
const resetAuth = () => ({type: types.RESET_AUTH})

export default {
    setAuth,
    setUser,
    resetAuth,
    setUsers,
    setRooms,
    addSession ,
    setSessions,
    addRoom
}
