// @ts-nocheck
import React, { useState , useEffect} from 'react'
import { Alert, Box, CircularProgress, LinearProgress } from "@mui/material";
import { request} from './axios_helper';
import { useNavigate } from "react-router-dom";
import { Checklist } from '@mui/icons-material';
import AlertTitle from '@mui/material/AlertTitle';

const AuthContext = React.createContext();

const AuthProvider =({children})=>{
    const navigate = useNavigate()
    const [loguedUser, setLoguedUser] = useState(false)
    const [ shift, setShift ] = useState(null)
    const [ loadingShift, setLoadingShift ] = useState()
    const [ loadingUser, setLoadingUser ] = useState()
    
    useEffect(()=>{
        setUserFromSessionStorage()
    }, [])

    useEffect(()=>{
        getShiftUser()
    }, [loguedUser])

    function getShiftUser(){          
        request(
            "GET",
            `shifts/user/${loguedUser.id}`,
            {})
            .then(
            (response) => {             
                setShift(response.data) 
                setLoadingShift(false)
            })
            .catch((error) => {
                setShift(null)
        })
    }
    function getAuthToken(){
        return window.localStorage.getItem("auth_token")
    }
    function setAuthHeader(token) {
        if (token !== null) {
          window.localStorage.setItem("auth_token", token);
        } else {
          window.localStorage.removeItem("auth_token");
        }
    }
    function setAuthToken(token){
        return window.localStorage.setItem("auth_token", token)
    }
    function setUserFromSessionStorage() {   
        request(
            "GET",
            "auth/userDetails",
            {})
            .then((response) => {                       
                setLoguedUser(response.data)
                setLoadingUser(false)                
            })
            .catch((error) => {
                console.log ("***********>>> "+error)  
                setAuthHeader(null);  
                setShift(null)            
            }
        )
    }
    function loginUser(usernameAtt, passwordAtt){        
        request(
            "POST" ,
            "auth/login",                
            { 
                username : usernameAtt , 
                password : passwordAtt
            } )
            .then( (resp) =>{           
                setLoguedUser(resp.data)
                setAuthToken(resp.data.token)  
                navigate("/dashboard") 
            })
            .catch( (error) =>{  
                setLoguedUser(false)   
                setAuthHeader(null);  
            })
    }
    function registerUser (data){        
        request(
            "POST" ,
            "auth/register",
            { 
                username : data.username , 
                password1 : data.password1,
                password2 : data.password2, 
                lastName : data.lastName,
                firstName : data.firstName, 
                phone : data.phone,
                dni : data.dni,
                email : data.email
            } )
        .then( (resp) =>{ 
            setAuthHeader(resp.token);
            setAuthToken(resp.token)
            setLoguedUser(resp)            
            navigate("/dashboard")  
        })
        .catch( (error) =>{
            console.log(" ======== error >>>>"+error) 
            setAuthHeader(null);
        })
    }
    function logout(){
        return window.localStorage.removeItem("auth_token")
    }
    function renderPendingPostRequest(){
        return(
            <div className="spinner"> 
                <Box sx={{ display: 'flex' }}  className="">
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
        loadingShift, 
        setLoadingShift,
        shift, 
        setShift,
        getShiftUser,
        getAuthToken,
        setAuthHeader,
        setAuthToken,
        setUserFromSessionStorage,
        loadingUser,
        loginUser,
        registerUser,
        logout,
        renderPendingPostRequest,       
        renderSpiner
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};