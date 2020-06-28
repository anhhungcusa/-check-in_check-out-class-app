import io from 'socket.io-client'
import {globals} from '.'
const socket = io(globals.env.SERVER_URL, {autoConnect: false})
export default socket