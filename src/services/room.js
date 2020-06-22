import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/rooms";
const getRooms = async () => {
  try {
    const res = await axios({
      method: "get",
      url: route
    });
    const { rooms, message } = res.data;
    return { rooms, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Rooms Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default { getRooms };
