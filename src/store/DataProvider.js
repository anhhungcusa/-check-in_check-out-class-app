import React from 'react'
import decode from 'jwt-decode'
import { useReducer } from 'react'
import { reducer, actions } from '.'
import { useEffect } from 'react'
import { CookieService } from '../services'
import globals from '../configs/globals'

const DataContext = React.createContext()

const initState = {
    auth: {
        token: null,
        isAuthorized: false,
        initLoading: false
    },
    user: null
}

function DataProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initState) 
    useEffect(() => {
        const token = CookieService.getCookie(globals.env.COOKIE_KEY);
        const user = decode(token)
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

export {DataProvider, DataContext}