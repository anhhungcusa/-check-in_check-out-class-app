const { default: Axios } = require("axios");
const { env } = require("./globals");

const instance = Axios.create({
    baseURL: env.API_URL,
    timeout: 30000,
    responseType: "json",

})

instance.defaults.headers.common['Authorization'] = 'hello1'

export {instance as axios}