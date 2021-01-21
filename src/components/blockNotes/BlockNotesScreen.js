import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const BlockNotesScreen = () => {


    const { active } = useSelector(state => state.notes)


    return (
        <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
            
            <Sidebar />

            <main>

                {/* si es la nota activa que muestre su contenido, si no que muestre la pantalla de nothingSelected */}
                {
                    ( active )
                        ? ( <NoteScreen /> )
                        : <NothingSelected />
                }
                
                
            </main>
        
        </div>
    )
}
