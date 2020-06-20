import { axios } from "../configs/axios"
import { Exception } from "../utils"

const route = '/auth' 

const login = async (username, password) => {
    try {
        const res = await axios({
            method: "post",
            url: `${route}/login`,
            data: {
                username, password
            }
        }) 
        const {user, token} = res.data
        return {user, token}
    } catch (error) {
        throw new Exception(error.message)
    }
}

export default {login, route}