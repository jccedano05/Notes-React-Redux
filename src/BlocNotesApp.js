import React from 'react'
import { AppRouter } from './routers/AppRouter'
import {Provider} from 'react-redux'
import { store } from './store/store'



export const BlocNotesApp = () => {


    return (
        <Provider store = {store}> {/* provider nos da a toda la aplicacion, lo que contiene store (como useContext) */}
            <AppRouter />
        </Provider>
    )
}
