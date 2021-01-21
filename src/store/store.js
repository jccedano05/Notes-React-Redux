
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducers';

//aqui esta el store de Redux, siempre debemos ponerlo en el punto mas alto de la aplicacion (en este caso BlocNotesApp)


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



//CombineReducers nos junta todos los reducers internos en uno solo, dandole un nombre en especifico
const reducers = combineReducers({

    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})




export const store = createStore(
    reducers, //creamos el store, el cual recibe un reducer (solo uno) por eso usamos combineReducers por si en un futuro crece
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //nos da el devTools para Redux y ver los states del inspector

    composeEnhancers(
        applyMiddleware( thunk )
    )
    );