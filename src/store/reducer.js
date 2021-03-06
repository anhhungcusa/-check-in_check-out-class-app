import { types } from ".";
import { initState } from "./DataProvider";

function reducer(state, { type, payload }) {
  switch (type) {
    case types.SET_AUTH: {
      const { token } = payload;
      return {
        ...state,
        auth: { token, isAuthorized: true, initLoading: true },
      };
    }
    case types.SET_USER: {
      const { user } = payload;
      return { ...state, user };
    }
    case types.RESET_AUTH: {
      const { auth, user } = initState;
      return { ...state, auth, user };
    }
    case types.SET_USERS: {
      const { users } = payload;
      return { ...state, users };
    }
    case types.SET_ROOMS: {
      const { rooms } = payload;
      return { ...state, rooms };
    }
    case types.ADD_SESSION: {
      const { session } = payload;
      let { sessions = [] } = state;
      let newSessions = sessions.slice();
      newSessions.push(session);
      return { ...state, sessions: newSessions };
    }
    case types.SET_SESSIONS: {
      const { sessions } = payload;
      return { ...state, sessions };
    }
    case types.ADD_ROOM: {
      const { room } = payload;
      let { rooms = [] } = state;
      let newRooms = rooms.slice();
      newRooms.push(room);
      return { ...state, rooms: newRooms };
    }
    case types.DELETE_SESSION: {
      const { _id } = payload;
      let { sessions = [] } = state;
      let newSessions = sessions.slice();
      let index = newSessions.findIndex((item) => item._id === _id);
      if (index === -1) return newSessions;
      newSessions.splice(index, 1);
      return { ...state, sessions: newSessions };
    }
    case types.SET_ROLES: {
      const { roles } = payload;
      return { ...state, roles };
    }
    case types.EDIT_SESSION: {
      const { session } = payload;
      let { sessions = [] } = state;
      let newSessions = sessions.slice();
      let index = newSessions.findIndex((item) => item._id === session._id);
      if (index === -1) return newSessions;
      newSessions[index] = session;
      return { ...state, sessions: newSessions };
    }
    case types.DELETE_USER: {
      const { userId } = payload;
      const users = state.users.slice();
      const deletedIndex = users.findIndex((user) => user._id === userId);
      if (deletedIndex !== -1) {
        users.splice(deletedIndex, 1);
      }
      return { ...state, users: users };
    }
    case types.DELETE_ROOM: {
      const { roomId } = payload;
      const rooms = state.rooms.slice();
      const deletedIndex = rooms.findIndex((room) => room._id === roomId);
      if (deletedIndex !== -1) {
        rooms.splice(deletedIndex, 1);
      }
      return { ...state, rooms: rooms };
    }
    case types.EDIT_ROOM: {
      const { room } = payload;
      let { rooms = [] } = state;
      let newRooms = rooms.slice();
      let index = newRooms.findIndex((item) => item._id === room._id);
      if (index === -1) return newRooms;
      newRooms[index] = room;
      return { ...state, rooms: newRooms };
    }
    default:
      console.error(`Unhandled action type: ${type}`);
      return state;
  }
}

export default reducer;
