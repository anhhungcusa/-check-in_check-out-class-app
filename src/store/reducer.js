import { types } from ".";

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
      console.log("2 sessions", sessions);
      return { ...state, sessions };
    }
    default:
      console.error(`Unhandled action type: ${type}`);
      return state;
  }
}

export default reducer;
