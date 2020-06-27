import moment from "moment";

export const formatDate = (dateString) => {
  return moment(dateString).format("dddd, DD - MM - YYYY, hh:mm:ss");
};

// YYYYMMDD
export const format = (dateString) => {
  return new moment(dateString).format("YYYYMMDD");
};

export const checkTimeValidSession = (id, sessions) => {
  const result = sessions.find((item) => item._id === id);
  const timeNow = moment().format();
  const { startAt, endAt } = result;
  if (startAt <= timeNow && timeNow <= endAt) {
    return false;
  }
  return true;
};
