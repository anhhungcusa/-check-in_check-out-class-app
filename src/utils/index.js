import decode from 'jwt-decode'
function Exception(message, status) {
    this.message  = message
    this.status = status
}


function jwtDecode(token) {
    try {
        if(!token) throw new Error('token not found')
        return decode(token)
    } catch (error) {
        return false
    }
}



export {Exception, jwtDecode}