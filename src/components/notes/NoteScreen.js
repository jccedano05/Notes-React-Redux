import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()


    const { active:note } = useSelector(storeRedux => storeRedux.notes);

    const [formValues, handleInputChange, reset] = useForm( note );

    const { body, title, id } = formValues;


    const activeId =  useRef(note.id)  // useRef cambia el valor de la variable sin mutar todo el componente, solo esa variable si cambia

    //Si lo dejamos sin el effect, siempre aparecera la misma nota aunque demos click, porque el useForm no cambia, por que tiene su propio estado (pasaria lo mismo si lo dejamos fuera)
    useEffect(() => {

        //hacemos esta comparacion para que no quede ciclicamente haciendo este efecto, si damos click en el cambio por useRef detectara y dara un nuevo valor a activeId
        if(note.id !== activeId.current){
            reset( note );
            activeId.current = note.id;
        }
        
    }, [note, reset])


    //se disparara cada que el formValues cambie de valor (osea al agregar o quitar texto)
    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues } ));
        
    }, [formValues, dispatch])


    const handleDelete = () => {
        
        dispatch( startDeleting( id ));
    }


    return (
        <div className="noteFile__main-content">
            
            <NotesAppBar />

            <div className="noteFile__content">

                <input 
                    type="text"
                    placeholder="Title Here"
                    className="noteFile__title-input"
                    autoComplete="off"
                    name="title"
                    value= { title }
                    onChange = { handleInputChange }
                />

                <textarea 
                    placeholder="Write something you want"
                    className="noteFile__textaera"
                    name="body"
                    value= { body }
                    onChange = { handleInputChange }

                >
                </textarea>

                {
                    (note.url) &&
                        (
                            <div className="noteFile__image">
                                <img src={note.url} alt="imagen" />
                            </div>
                        )
                }
                
                
            </div>


            <button className=" btn btn-danger" onClick={ handleDelete }>
                Delete Note
            </button>

        </div>
    )
}
