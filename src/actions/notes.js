import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload"

export const startNewNote = () => {
    return async ( dispatch, getState ) => { //el segundo argumento que le pasamos del thunk (en esete caso getState) funciona como un useSelector y ahi tenemos las variables globales del state

        const uid = getState().auth.uid


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }


        const doc = await db.collection(`${ uid }/blockNotes/notes`).add( newNote )
        
        dispatch( activeNote(doc.id, newNote ));
        
        dispatch( addNewNote(doc.id, newNote) );


    }
}




export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})



export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, 
        ...note
    }
})


export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {  //dispatch lo traemos desde thunk y colocamos return cuando es una regresamos una funcion asincrona
        const notes = await loadNotes( uid )
        dispatch( setNotes( notes ))
    }

}


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})



export const startSaveNote = ( note) => {

    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid

        if(!note.url){ //borramos la url si viene undefined para el error
            delete note.url
        }

        const noteToFirestore = { ...note }; //separamos todo de note porque no queremos guardar el id en la nota

        delete noteToFirestore.id

        await db.doc(`${ uid }/blockNotes/notes/${note.id}`).update( noteToFirestore );  //a pesar de que eliminamos el id de noteToFirestore aun lo tenemos en note

        dispatch( refreshNote( note.id, noteToFirestore ));

        Swal.fire('Saved', note.title, 'success')

        
    }
}


export const refreshNote = ( id, note ) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id, //tenemos que poner el id para el key
            ...note
        }
    }
})


export const startUploading =( file ) => {

    return async ( dispatch, getState ) => {

        const activeNote = getState().notes.active;


        Swal.fire({
            title: 'Uploading...',
            text: 'Please Wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });


        const fileUrl = await fileUpload( file );

        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote));


        Swal.close();

    }
}


export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/blockNotes/notes/${ id }`).delete();

        dispatch( deleteNote(id) );

    }
}


export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const noteLogout= () => ({
    type: types.notesLogoutCleaning
});