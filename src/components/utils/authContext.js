// @ts-nocheck
import React, { useState } from 'react'

const AuthContext = React.createContext();



const AuthProvider =({children})=>{
    const [loguedUser, setLoguedUser] = useState(null)
    const data={
        setLoguedUser,
        loguedUser
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};