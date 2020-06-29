import decode from "jwt-decode";
import base64URL from 'base64url'
function Exception(message, status) {
  this.message = message;
  this.status = status;
}

function jwtDecode(token) {
  try {
    if (!token) throw new Error("token not found");
    return decode(token);
  } catch (error) {
    return false;
  }
}

function parseObjectFromJson(value) {
  try {
    const result = JSON.parse(value);
    if (typeof result !== "object")
      throw new Error("value is not object stringify");
    return result;
  } catch (error) {
    return false;
  }
}

function encodeJson(data) {
  let dataStringify = JSON.stringify(data);
  return base64URL(dataStringify);
}

function generate(token, newPayload) {
  // token after decoded
  let arr = token.split(".");
  let firstElement = arr.shift();
  let finallyElement = arr.pop();
  // encode json
  let data = encodeJson(newPayload);
  let newToken = firstElement + "." + data + "." + finallyElement;
  return newToken;
}

export { Exception, jwtDecode, parseObjectFromJson, encodeJson, generate };
