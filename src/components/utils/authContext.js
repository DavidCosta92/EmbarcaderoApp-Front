// @ts-nocheck
import React, { useState } from 'react'
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import { clearStorageAuthToken } from './axios_helper';
import {request, setAuthHeader, setAuthToken } from "../utils/axios_helper"

const AuthContext = React.createContext();

/*

ACA DEBO SETEAR EL LOGUED USER DESDE LA MEMORIA... EN OTRAS PALABRAS, SI RECARGO LA APP O SI LA ABRO EN OTRA PESTAÑA
DEBERIA BUSCAR EL TOKEN GUARDADO, Y SI ESTA DEBERIA ENVIAR UN MENSJAE AL BACK PARA VER SI SIGUE VALIDOOO SI SIGUE,
MUESTRO EL USER COMO AcTIVEOOO SINO, LO MANDO A LOGUEARSE DE NUEVO!"
*/

const AuthProvider =({children})=>{
    const [loguedUser, setLoguedUser] = useState(false)
    const [ shiftId, setShiftId ] = useState(null)

    function logout(){
        clearStorageAuthToken()
    }

    function renderPendingPostRequest(){
        return(
            <div className="spinner"> 
                <Box sx={{ display: 'flex' }}  className="pendingPostRequest">
                <div class="alert alert-success" role="alert">
                    <h4 className="alert-heading">Enviando peticion..</h4>
                    <LinearProgress color="success" />
                </div>
                    
                </Box>
            </div>           
        )
    }

    function renderSpiner(){
        return(
            <div className="spinner"> 
                <Box sx={{ display: 'flex' }}  className="spinnerWheel">
                    <CircularProgress color="primary" size="lg"/>
                </Box>

            </div>           
        )
    }

    const data={
        loguedUser,
        setLoguedUser,
        logout,
        shiftId, 
        setShiftId,        
        renderSpiner,
        renderPendingPostRequest
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};