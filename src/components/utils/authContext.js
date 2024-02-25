// @ts-nocheck
import React, { useState } from 'react'
import { Box, CircularProgress } from "@mui/material";

const AuthContext = React.createContext();



const AuthProvider =({children})=>{
    const [loguedUser, setLoguedUser] = useState(false)

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
        setLoguedUser
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};