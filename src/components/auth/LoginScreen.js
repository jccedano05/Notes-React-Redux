import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from '../../hooks/useForm'
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

export const LoginScreen = () => {


    //REDUX (allow access to dispatch)
    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.ui)

    // change of inputs HOOK useForm
    const [formValues, handleInputChange] = useForm({
        email: 'test_user@test.com',
        password: '123456789'
    });
 
    const { email, password } = formValues;


    //handle button form Email Sign in
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) )
    }


    // Button from Gmail auth sign in
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>

            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster" >
                <input type="text" placeholder="Email" name="email" className="auth__input" autoComplete="off" value={email} onChange={handleInputChange} />
                
                <input type="password" placeholder="Password" name="password" className="auth__input" value={password} onChange={handleInputChange} />

                <button className="btn btn-primary btn-block" disabled={ loading } type="submit"> Login </button>
                
                <div className="auth__social-network">
                    <p>Login with social network</p>

                    <div className="google-btn" onClick= { handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                    <Link to="/auth/register" className="link">
                            Create new account
                    </Link>

                </div>
            </form>
        </>
    )
}
