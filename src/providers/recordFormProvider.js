// @ts-nocheck
import { createContext, useContext, useReducer, useState } from "react";

const RecordFormContext = createContext();

function RecordFormProvider ({ children }) {
    const [record , setRecord ]= useState()
    const [person , setPerson ]= useState()
    const [boat , setBoat ]= useState()

    const data={
        record , setRecord, person , setPerson ,boat , setBoat
    }

    return <RecordFormContext.Provider value={data}>
        {children}
    </RecordFormContext.Provider>
}

export default RecordFormProvider

export {RecordFormContext};