// @ts-nocheck
import { createContext, useContext, useReducer, useState } from "react";




const RecordFormContext = createContext();
/*
export const useRecordFormContext = () => {
    return useContext(RecordFormContext);
}

const reducer = (state, action) => {
    // { type, data }
    switch (action.type) {
        case 'SET_PERSON': {
            console.log("ENTRE EN SET PERSON"+action.data.dni)
            return { ...state, person: {...action.data} };
        }
        case 'SET_BOAT': {
            return { ...state, boat: { ...action.data } };
        }
        case 'SET_GUEST': {
            return { ...state, numberOfGuests: action.data };
        }
        case 'SET_CAR': {
            return { ...state, car: action.data };
        }
        case 'SET_NOTES': {
            return { ...state, notes: action.data };
        }
    }
    return state;
}

*/
function RecordFormProvider ({ children }) {
    const [record , setRecord ]= useState()
    const [person , setPerson ]= useState()

    const data={
        record , setRecord, person , setPerson 
    }

    return <RecordFormContext.Provider value={data}>
        {children}
    </RecordFormContext.Provider>
}

export default RecordFormProvider

export {RecordFormContext};