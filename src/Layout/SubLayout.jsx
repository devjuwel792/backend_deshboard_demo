'use client'
import ReduxProvider from '../Helper/Redux/provider'
import { store } from '../Helper/Redux/store'
import React from 'react'

const SubLayout = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    )
}

export default SubLayout