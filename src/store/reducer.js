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
      var { sessions } = state;
      if (!sessions) {
        sessions = session;
      } else {
        sessions.push(session);
      }
      return { ...state, sessions };
    }
    case types.SET_SESSIONS: {
      const { sessions } = payload;
      return { ...state, sessions };
    }
    case types.ADD_ROOM: {
      const { room } = payload;
      let { rooms = [] } = state;
      rooms.slice(room);
      return { ...state, rooms };
    }
    default:
      console.error(`Unhandled action type: ${type}`);
      return state;
  }
}

export default reducer;
