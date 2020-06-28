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
const deleteSession = _id => ({type: types.DELETE_SESSION, payload: {_id}})
const setRoles = (roles) => ({type: types.SET_ROLES, payload: {roles}})
const editSession = session => ({type: types.EDIT_SESSION, payload: {session}})
const deleteUserById = userId => ({type: types.DELETE_USER, payload: {userId}})
const deleteRoomById = roomId => ({type: types.DELETE_ROOM, payload: {roomId}})

export default {
    setAuth,
    setUser,
    resetAuth,
    setUsers,
    setRooms,
    addSession ,
    setSessions,
    addRoom,
    deleteSession,
    setRoles,
    editSession,
    deleteUserById,
    deleteRoomById
}
