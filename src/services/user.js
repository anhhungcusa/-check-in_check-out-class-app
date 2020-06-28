import { Exception } from "../utils";
import { messagedStatus } from "../constants/index";
import { axios } from "../configs";

const route = "/users";
const getUser = async () => {
  try {
    const res = await axios({
      method: "get",
      url: route,
    });
    const { users, message } = res.data;
    return { users, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get Users Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

const deleteUserById = async (userId, username) => {
  try {
    await axios({
      method: "delete",
      url: `${route}/${userId}`,
    });
    return { message: `delete ${username} success` };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      `delete ${username} failed`;
    throw new Exception(message, messagedStatus.error);
  }
};

const getRoles = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${route}/roles`,
    });
    const { roles } = res.data;
    return { roles, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "get roles failed";
    throw new Exception(message, messagedStatus.error);
  }
};

const getUserById = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: route + `/${id}`,
    });
    const { user, message } = res.data;
    return { user, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Get User Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

const editUser = async ({ id, username, fullname }) => {
  try {
    const res = await axios({
      method: "patch",
      url: route + `/${id}`,
      data: {
        username,
        fullname,
      },
    });
    const { user, message } = res.data;
    return { user, message, status: messagedStatus.success };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Edit User Failed";
    throw new Exception(message, messagedStatus.error);
  }
};

export default { getUser, getRoles, deleteUserById, getUserById, editUser };
