import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const Note = ( { id, date, title, body, url }) => {


    const noteDate = moment( date )

    const dispatch = useDispatch()

    //no agarra el dispatch del active
    const handleEntryClick = () => {
        dispatch( activeNote( id, {
            date, title, body, url
        }));
    }

    return (
        <div className="notes__note pointer animate__animated animate__fadeIn animate__faster" onClick={ handleEntryClick }>
           
           
            {
                url &&
                <div className="notes__note-picture" style={{ backgroundSize: 'cover', backgroundImage: `url(${ url })`}}>
                </div>
            }
            

            <div className="notes__note-body">
                <p className="notes__note-body-title">
                    { title }
                </p>
                <p className="notes__note-body-content">
                    { body }
                </p>
            </div>

            <div className="notes__note-date-box">
            <span> { noteDate.format('dddd') } </span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
