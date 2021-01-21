import React from 'react'
import { useSelector } from 'react-redux';
import { Note } from './Note';

export const NotesEntry = () => {


    const { notes } = useSelector(storeRedux => storeRedux.notes);


    return (
        <div className="notes__entries">
            
            {
                notes.map( note => (
                   <Note 
                        key={note.id} 
                        { ...note }
                   /> 
                ))
            }

        </div>
    )
}
