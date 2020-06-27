import React from 'react'
import { useReducer } from 'react'
import { reducer, actions } from '.'
import { useEffect } from 'react'
import { CookieService } from '../services'
import {globals} from '../configs'
import { jwtDecode } from '../utils'

const DataContext = React.createContext()

const initState = {
    auth: {
        token: null,
        isAuthorized: false,
        initLoading: false
    },
    user: null,
    users: null,
    rooms: null,
    sessions: null,
    roles: null
}

function DataProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initState) 
    useEffect(() => {
        const token = CookieService.getCookie(globals.env.COOKIE_KEY);
        if(!token) return
        const user = jwtDecode(token)
        if(!user) return
        dispatch(actions.setAuth(token))
        dispatch(actions.setUser(user))
    }, [])
    return(
        <DataContext.Provider 
        value={{
            state,
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider, DataContext, initState}