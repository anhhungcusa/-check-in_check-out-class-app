import React from 'react'
import { useReducer } from 'react'
import { reducer } from '.'

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