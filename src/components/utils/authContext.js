// @ts-nocheck
import React, { useState } from 'react'
import { Box, CircularProgress, LinearProgress } from "@mui/material";

const AuthContext = React.createContext();



const AuthProvider =({children})=>{
    const [loguedUser, setLoguedUser] = useState(false)
    const [ shiftId, setShiftId ] = useState(null)

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
        renderSpiner,
        loguedUser,
        setLoguedUser,
        shiftId, 
        renderPendingPostRequest,
        setShiftId        
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};