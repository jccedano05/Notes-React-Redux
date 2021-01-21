import { db } from '../firebase/firebase-config'

export const loadNotes =  async( uid ) => {

    const notesSnap = await db.collection(`${ uid }/blockNotes/notes`).get();
    const notes = [];

    notesSnap.forEach( snapChildren => {
        notes.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
        
    })

    
    return notes;

}