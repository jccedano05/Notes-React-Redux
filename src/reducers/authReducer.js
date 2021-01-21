/* 
    El state va a estar vacio cuando yo no este autenticado

    ya autenticado {
        uid: aslidjlasidj,
        name:'carlos'
    }

*/

import { types } from "../types/types";

export const authReducer = (state = {}, action) => { //state nunca debe regresar a undefined por eso le damos el valor de un {} inicialmente


    switch (action.type) {

        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
    
        case types.logout:
            return {}

        default:
            return state;
    }

}