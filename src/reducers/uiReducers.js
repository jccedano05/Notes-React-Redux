import { types } from "../types/types";


const initialState = {
    loading: false,  //es como estara cuando se cargue la aplicacion
    msg: null //es el que manejara el error 

}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiSetError: 
            return {
                ...state,  //mantenemos initialState (que le pasamos al state) y le agregamos el msgError
                msgError: action.payload
            }

            case types.uiRemoveError: 
            return {
                ...state,
                msgError: null
            }

            case types.uiStartLoading:
                return {
                    ...state,
                    loading: true
                }

            case types.uiFinishLoading:
                return {
                    ...state,
                    loading: false
                }
        
    
        default:
            return state;
    }

}