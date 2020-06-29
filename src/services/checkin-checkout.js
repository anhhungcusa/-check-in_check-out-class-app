import { Exception } from "../utils"
import {messagedStatus} from '../constants/index'
import { axios } from "../configs"

const route = '/checkin-checkout' 
const checking = async (codeId, sessionId, expires) => {
    try {
        const checkingAt = Date.now()
        if(checkingAt > expires) throw new Exception('QR code is expired')
        const res = await axios({
            method: "post",
            url: route,
            data: {
                codeId, sessionId
            }
        }) 
        const {session, message} = res.data
        return {session, message}
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'checking failed'
        throw new Exception(message, messagedStatus.error)
    }
}

const getCheckinById = async (id) => {
    try {
        const res = await axios({
            method: "get",
            url: route + `/${id}`
        }) 
        const {checkins, message} = res.data
        return {checkins, message}
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'get checkin failed'
        throw new Exception(message, messagedStatus.error)
    }
}

export default {checking, route, getCheckinById}