import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/tokens";
const requireAcceptToken = async ({ _id, username, fullname, role }) => {
  try {
    const res = await axios({
      method: "post",
      url: route,
      data: {
        _id,
        username,
        fullname,
        role,
      },
    });
    const { token, message } = res.data;
    return {
      token,
      message,
      status: messagedStatus.success,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Require Accept Token Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default {
  requireAcceptToken,
};
