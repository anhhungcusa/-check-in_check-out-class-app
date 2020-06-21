import { axios } from "../configs/axios"
import { Exception } from "../utils"
import {messagedStatus} from '../constants/index'

const route = '/auth' 
const loginPath = '/login'
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
        const {message = 'login failed'} = error
        throw new Exception(message, messagedStatus.error)
    }
}

export default {login, route, loginPath}