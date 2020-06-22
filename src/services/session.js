import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/";
const sessionPath = "sessions";
const createSession = async ({startAt, endAt, name, hostId, roomId}) => {
  try {
    const res = await axios({
      method: "post",
      url: route + sessionPath,
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

export default { createSession };
