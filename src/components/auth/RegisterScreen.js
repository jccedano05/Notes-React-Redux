import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'
import { removeError } from '../../actions/ui'
import Swal from 'sweetalert2'

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {


    //Creamos el Dispatch
     const dispatch = useDispatch()

     //useState regresa un callback de lo que se encuentra en redux (lo almacenado en el dispatch que en este caso es el Auth y Ui)
     const { msgError } = useSelector(state => state.ui)  //destructuramos lo que hay en el dispatch de ui y traemos el msgError


    const [ formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formValues;


    //Register
    const handleRegister = (e) => {

        e.preventDefault();

        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName(email, password, name) )
        }
    }

    // Validate Form
    const isFormValid = () => {

        if(name.trim().length === 0){
            Swal.fire('Error', "Name is required", 'error');
            return false;
        }else if( !validator.isEmail(email) ){
            Swal.fire('Error', "Email is not Valid", 'error');
            return false;
        }else if((password !== confirmPassword) || (password.length < 6)){
            Swal.fire('Error', "Password match or length is not valid", 'error');
            return false;
        }
        dispatch( removeError() )
        return true;
    }


    return (
        <>

        <h3 className="auth__title">Register</h3>

        <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">

            {
                msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
            }


            <input type="text" placeholder="Name" name="name" className="auth__input" autoComplete="off" value={ name } onChange={handleInputChange} />


            <input type="text" placeholder="Email" name="email" className="auth__input" autoComplete="off" value={ email } onChange={handleInputChange} />
            
            <input type="password" placeholder="Password" name="password" className="auth__input" value={ password } onChange={handleInputChange} />

            <input type="password" placeholder="Confirm Password" name="confirmPassword" className="auth__input" value={ confirmPassword } onChange={handleInputChange} />

            <button className="btn btn-primary btn-block mb-5"  type="submit"> Register </button>
            
          
               
                <Link to="/auth/login" className="link my-5">
                        Already registered?
                </Link>

           
        </form>
    </>
    )
}
