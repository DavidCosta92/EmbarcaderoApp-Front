// @ts-nocheck
import React, { useState , useEffect} from 'react'
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import { request} from './axios_helper';
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider =({children})=>{
    const navigate = useNavigate()
    const [ loguedUser, setLoguedUser] = useState(false)
    const [ shift, setShift ] = useState(null)
    const [ shiftHasUpdates, setShiftHasUpdates ] = useState(false)
    const [ loadingShift, setLoadingShift ] = useState()
    const [ loadingUser, setLoadingUser ] = useState()    
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const [ error , setError] = useState(false)
    
    useEffect(()=>{
        setUserFromSessionStorage()
    }, [])

    useEffect(()=>{
        getShiftUser()
    }, [loguedUser])

    useEffect(()=>{
        getShiftUser()
    }, [shiftHasUpdates])

    function getShiftUser(){     
        if(loguedUser){
            setLoadingShift(true) 
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
                    if(error.response?.status === 404){       
                        setShift(null)           
                        setLoadingShift(false)  
                    }
            })
            setShiftHasUpdates(false)            
        }     
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
        if(getAuthToken()){
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

    }
    function loginUser(usernameAtt, passwordAtt){    
        setSendingPostRequest(true)      
        request(
            "POST" ,
            "auth/login",                
            { 
                username : usernameAtt , 
                password : passwordAtt
            } )
            .then((resp) =>{     
                setLoguedUser(resp.data)
                setAuthToken(resp.data.token)  
                setSendingPostRequest(false)  
                setError(false)
                navigate("/dashboard") 
            })
            .catch( (error) =>{  
                if(error.response.status == 400){
                    setError({status: error.response.status, message: "Credenciales erroneas, verifica datos!"})
                }
                setLoguedUser(false)   
                setSendingPostRequest(false)  
                setAuthHeader(null);  
            })
    }
    function registerUser (data){        
        setSendingPostRequest(true)  
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
            if(resp.data.sendStatus !== "OK"){
                setError({status: 500, message: `Registro exitoso!, sin embargo ocurrio un error al enviar email: ${resp.data.sendStatus}`})
            }    
            setAuthHeader(resp.data.token);
            setAuthToken(resp.data.token)
            setLoguedUser(resp.data)          
            setSendingPostRequest(false)  
            setError(false)
            navigate("/dashboard")  
        })
        .catch( (error) =>{
            if(error.response.status == 409){
                setError({status: error.response.status, message: "Datos existentes, revisa los datos ingresados o bien inicia sesion"})
            } else if(error.response.status == 406){
                setError({status: error.response.status, message: error.response.data.message})
            }    
            setSendingPostRequest(false)  
            setAuthHeader(null);
        })
    }
    function logout(){
        setLoguedUser(false)
        return window.localStorage.removeItem("auth_token")
    }
    function renderPendingPostRequest(){
        return(
            <div className="spinner"> 
                <Box sx={{ display: 'flex' }}  className="">
                    <div class="alert " role="alert">
                        <p className="alert-heading">Enviando peticion..</p>
                        <LinearProgress color="inherit" />
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
        shiftHasUpdates, 
        setShiftHasUpdates,
        getShiftUser,
        getAuthToken,
        setAuthHeader,
        setAuthToken,
        setUserFromSessionStorage,
        loadingUser,
        loginUser,
        registerUser,
        logout,
        sendingPostRequest , 
        setSendingPostRequest,
        renderPendingPostRequest,       
        renderSpiner,
        error , 
        setError
        }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};