import globals from "./globals";

const { default: Axios } = require("axios");


const instance = Axios.create({
    baseURL: globals.env.API_URL,
    timeout: 30000,
    responseType: "json",

})
instance.setAuthorization = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


export default instance 