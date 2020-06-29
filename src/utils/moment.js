import moment from "moment";

export const formatDate = (dateString) => {
  return moment(dateString).format("dddd, DD - MM - YYYY, hh:mm:ss");
};

// YYYYMMDD
export const format = (dateString) => {
  return new moment(dateString).format("YYYYMMDD");
};

export const checkTimeSessionValid = (id, sessions) => {
  const result = sessions.find((item) => item._id === id);
  let date = new Date();
  const timeNow = date.getTime();

  const { startAt, endAt } = result;
  let startTime = new Date(startAt).getTime();
  let endTime = new Date(endAt).getTime();

  if (startTime <= timeNow && timeNow <= endTime) {
    return false;
  }
  return true;
};
