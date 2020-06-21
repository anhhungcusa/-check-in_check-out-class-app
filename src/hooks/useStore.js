import {useContext} from 'react'
import { DataContext } from '../store'
import { useMemo } from 'react'

function useStore() {
    const {state} = useContext(DataContext)
    return useMemo(() => state, [state])
}

export {useStore}