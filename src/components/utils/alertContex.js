// @ts-nocheck
import React, { useState , useEffect} from 'react'
import CustomAlert from '../alert/customAlert';


const AlertContext = React.createContext();

const AlertProvider =({children})=>{
    const [alert, setAlert] = useState()


    function renderAlert(msg, title, style, miliseg){
        setAlert({msg:msg, title: title, style: style})
        setTimeout(() => {
            setAlert(false);
         }, miliseg);
    }
    function displayAlert(alertConfig){
        return( 
        <CustomAlert alertConfig={alertConfig} /> 
        )
    }
    const data={
        renderAlert,
        alert,
        displayAlert
    }

    return (
        <AlertContext.Provider value={data}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider;
export {AlertContext};