import {useContext} from 'react'
import { DataContext } from '../store'
import { useCallback } from 'react'


const useDispatch = (onTracking = true) => {
    const {dispatch} = useContext(DataContext)

    return useCallback((action) => {
        if(onTracking) {
            const {type, payload} = action
            console.log(`Action: %c${type}`, "color:green")
            console.log(`Payload: `, payload)
        }
        return dispatch(action)
    }, [dispatch, onTracking])
}

export default useDispatch