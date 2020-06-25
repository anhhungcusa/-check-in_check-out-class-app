import { Exception } from "../utils"
import {messagedStatus} from '../constants/index'
import { axios } from "../configs"

const route = '/auth' 
const loginPath = '/login'
const registerPath = '/register'
const login = async (username, password) => {
    try {
        const res = await axios({
            method: "post",
            url: route + loginPath,
            data: {
                username, password
            }
        }) 
        const {user, token} = res.data
        return {user, token, message: 'login success', status: messagedStatus.success}
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'login failed'
        throw new Exception(message, messagedStatus.error)
    }
}

const register = async (username, password, fullname) => {
    try {
        await axios({
            method: "post",
            url: route + registerPath,
            data: {
                username, password, fullname
            }
        }) 
        return {message: 'register success', status: messagedStatus.success}
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'register failed'
        throw new Exception(message, messagedStatus.error)
    }
}

export default {login, register}