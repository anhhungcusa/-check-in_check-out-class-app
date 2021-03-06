import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/sessions";
const createSession = async ({ startAt, endAt, name, hostId, roomId }) => {
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

const getSessionById = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${route}/${id}`,
    });
    const { session } = res.data;
    return session
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Session Failed";
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

const deleteSession = async (id) => {
  try {
    const res = await axios({
      method: "delete",
      url: route + `/${id}`,
    });
    const { message } = res.data;
    return { message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Delete Session Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

const editSession = async ({ id, startAt, endAt, name, roomId }) => {
  try {
    const res = await axios({
      method: "patch",
      url: route + `/${id}`,
      data: {
        startAt,
        endAt,
        name,
        roomId
      },
    });
    const { session, message } = res.data;
    return { session, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Delete Session Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  editSession,
  getSessionById
};
