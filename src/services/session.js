import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/sessions";
const createSession = async ({startAt, endAt, name, hostId, roomId}) => {
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

const getSessions = async () => {
  try {
    const res = await axios({
      method: "get",
      url: route,
    });
    const { sessions, message } = res.data;
    return { sessions, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Sessions Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

const getSession = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${route}/${id}`,
    });
    const { session, message } = res.data;
    return { session, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Session Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default { createSession, getSessions, getSession };
