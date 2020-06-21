import { types } from "."

function reducer (state, {type, payload}) {
    switch (type) {
        case types.SET_AUTH: {
            const {token} = payload
            return {...state, auth: {token, isAuthorized: true, initLoading: true}}
        }
        case types.SET_USER: {
            const {user} = payload
            return {...state, user}
        }
        default:
            console.error(`Unhandled action type: ${type}`)
            return state
    }
}

export default reducer