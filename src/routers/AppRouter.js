import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { BlockNotesScreen } from '../components/blockNotes/BlockNotesScreen';
import { AuthRouter } from './AuthRouter';
import {firebase} from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';




export const AppRouter = () => {

    const dispatch = useDispatch()

    //este state nos ayudara a esperar a que firebase termine de revisar por primera vez si estamos autentificados o no
    const [checking, setChecking] = useState(true)

    //este state sera nuestro auxiliar para saber si estamos logeado o no, que nos servira para nuestras rutas privadas
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    //usaremos un efecto para cuando firebase cambie el estado de la autentificacion (login, logout, etc)
    useEffect(() => {
        
        //esto genera un obserbable (un objeto que se dispara mas de una vez y sirve para que el estado se quede a pesar de un refresh)
        firebase.auth().onAuthStateChanged( async (user) => {

            if( user?.uid){  // el ? evalua si el objeto user tiene algo en uid
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);

                dispatch( startLoadingNotes( user.uid ))  //guardamos las notas que tiene ese uid 

            } else{
                setIsLoggedIn(false);
            }

            setChecking(false);

        }); 

    }, [ dispatch, setChecking, setIsLoggedIn ])  //si dejamos la dependencia [] sin nada dentro, eso solo se ejecutara una vez



    if( checking ){
        <h1>Wait...</h1>
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated= {isLoggedIn} component={ AuthRouter } />
                    <PrivateRoute exact isAuthenticated= {isLoggedIn} path="/" component={ BlockNotesScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
