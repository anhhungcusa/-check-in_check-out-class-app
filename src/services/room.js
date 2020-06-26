import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/rooms";
const getRooms = async () => {
  try {
    const res = await axios({
      method: "get",
      url: route,
    });
    const { rooms, message } = res.data;
    return { rooms, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Rooms Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

const createRoom = async ({ name }) => {
  try {
    const res = await axios({
      method: "post",
      url: route,
      data: {
        name,
      },
    });
    const { session, message } = res.data;
    return { session, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Create Room Failed";
    throw new Exception(message, messagedStatus.error);
  }
};
export default { getRooms, createRoom };
