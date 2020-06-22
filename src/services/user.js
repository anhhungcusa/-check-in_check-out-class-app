import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/users";
const getUser = async () => {
  try {
    const res = await axios({
      method: "get",
      url: route
    });
    const { users, message } = res.data;
    return { users, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Users Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default { getUser };
