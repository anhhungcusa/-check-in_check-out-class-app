import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

<<<<<<< src/services/session.js
const route = "/sessions";
const createSession = async ({startAt, endAt, name, hostId, roomId}) => {
=======
const route = "/";
const sessionPath = "sessions";
const createSession = async ({ startAt, endAt, name, hostId, roomId }) => {
>>>>>>> src/services/session.js
  try {
    const res = await axios({
      method: "post",
      url: route,
      data: {
        startAt,
        endAt,
        name,
        hostId,
        roomId,
      },
    });
    const { session, message } = res.data;
    return { session, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Create Session Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

<<<<<<< src/services/session.js
const getSessionById = async id => {
  try {
    const res = await axios({
      url: `${route}/${id}`,
      method: 'get'
    })
    return res.data.session
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "get session failed";
    throw new Exception(message, messagedStatus.error);
  }
}

export default { createSession, getSessionById };
=======
const getSessions = async () => {
  try {
    const res = await axios({
      method: "get",
      url: route + sessionPath,
    });
    const { sessions, message } = res.data;
    return { sessions, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Sessions Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default { createSession, getSessions };
>>>>>>> src/services/session.js
