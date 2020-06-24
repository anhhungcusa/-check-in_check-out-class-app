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

function parseObjectFromJson(value) {
    try {
        const result = JSON.parse(value)
        if(typeof result !== 'object') throw new Error('value is not object stringify')
        return result
    } catch (error) {
        return false
    }
}



export {Exception, jwtDecode, parseObjectFromJson}