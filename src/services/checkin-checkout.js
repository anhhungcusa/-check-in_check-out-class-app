import { Exception } from "../utils"
import {messagedStatus} from '../constants/index'
import { axios } from "../configs"

const route = '/checkin-checkout' 
const checking = async (codeId, sessionId, expiries) => {
    try {
        const res = await axios({
            method: "post",
            url: route,
            data: {
                codeId, sessionId, expiries, checkingAt: Date.now()
            }
        }) 
        const {session, message} = res.data
        return {session, message}
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'checking failed'
        throw new Exception(message, messagedStatus.error)
    }
}

export default {checking, route}