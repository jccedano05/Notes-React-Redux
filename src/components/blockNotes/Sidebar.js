import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import {  NotesEntry } from './NotesEntry'

export const Sidebar = () => {


    const dispatch = useDispatch()

    const {name} = useSelector(storeRedux => storeRedux.auth) //este checa en Redux las variables globales que declaramos en el store y en este caso usamos el reducer auth


    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNewEntry = () => {
        dispatch( startNewNote() );
    }


    return (
        <aside className="notes__sidebar">
            

            <div className="notes__sidebar-nabvar">
                <h3 className="mt-5">
                    <i className=" far fa-moon" ></i>
                    <span> { name } </span>
                </h3>

                <button className="btn" onClick={ handleLogout }>
                    Logout
                </button>
            </div>

            <div className="notes__new-entry" onClick={ handleAddNewEntry }>
                <i className="far fa-calendar-plus fa-3x"></i>
                <p className="mt-5">New Entry</p>
            </div>

            <NotesEntry />


        </aside>
    )
}
