// @ts-nocheck
import "./loginForm.css"

import { useContext , useEffect, useState} from "react";
import { AuthContext } from '../../utils/authContext';
import {request , setAuthToken , setAuthHeader} from "../../utils/axios_helper"
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export default function LoginForm ({setForm}){
    const { loguedUser,setLoguedUser,logout, /*onLogin , onRegister, */renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    
    const { register, formState:{errors}, handleSubmit, watch } = useForm()
    const navigate = useNavigate()

    const sendForm = (data) =>{
        console.log(data)
        request(
            "POST" ,
            "auth/login",                
            { 
                username : data.username , 
                password : data.password
            } )
        .then( (resp) =>{ 
            setAuthToken(resp.data.token)     
            setLoguedUser(resp.data)     
            navigate("/dashboard")  
        })
        .catch( (error) =>{
            console.log(" ======== error >>>>"+error)                
            setAuthHeader(null); 
            setLoguedUser(false)       
        })
    }

    return(      
    <div className="row justify-content-center">
        <div className="col-4">
        
        {/* FORM LOGIN */}
            <div className="tab-pane" id="pills-login" >
                <form onSubmit={handleSubmit(sendForm)}>
                    <div className="form-outline mb-4">
                    <input type="login" id="loginUsername" name= "username" className="form-control" {...register("username", {required:true, maxLength:10 })}  />
                    <label className="form-label" htmlFor="loginUsername">Username</label>
                    {errors.username?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                    {errors.username?.type === "maxLength" && <p className="inputFormError">Largo maximo de 10 caracteres</p>}
                    </div>

                    <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" name="password" className="form-control" {...register("password", {required:true})} />
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    {errors.password?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesion</button>

                </form>
                <button type="submit" className="btn btn-secondary btn-block mb-4" onClick={()=> setForm("register")}>Registrarme</button>
            </div>        
        </div>
    </div>
        
    )
}