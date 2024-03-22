// @ts-nocheck
import "./loginForm.css"
import { useContext, useEffect, useState} from "react";
import { AuthContext } from '../../utils/authContext';
import { useForm } from 'react-hook-form';
import { AlertContext } from "../../utils/alertContex";

export default function LoginForm ({setForm}){
    const { loginUser, sendingPostRequest, renderPendingPostRequest, error} = useContext(AuthContext)
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)    
    
    const { register, formState:{errors}, handleSubmit } = useForm()

    const sendForm = (data) =>{
        loginUser(data.username , data.password) 
    }
    
    
    useEffect(()=>{
        if(error){
            renderAlert(`Cod: ${error.status}, ${error.message}`, "Error", "error", 6000)
        }
    }, [error])


    function renderPendingRequest(){
        return (
            <div className="loginPostRequestContainter">
                {renderPendingPostRequest()}
            </div>
        )
    }

    function renderLoginForm(){
        return(      
        <div className="row justify-content-center">
            <div className="">        
            {/* FORM LOGIN */}
                <div className="authForm">
                    <form onSubmit={handleSubmit(sendForm)}>
                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="loginUsername">Username</label>
                            <input type="login" id="loginUsername" name= "username" className="form-control" {...register("username",{required:true, minLength: 2 , maxLength:30, pattern:/^[A-Za-z0-9]+$/ })} />
                                {errors.username?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                {(errors.username?.type === "minLength" || errors.username?.type === "maxLength") && <p className="inputFormError">El campo debe tener entre 2 y 30 caracteres</p>}
                                {errors.username?.type === "pattern" && <p className="inputFormError">El campo solo permite letras y numeros</p>}
                        </div>
    
                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="loginPassword">Password</label>
                            <input type="password" id="loginPassword" name="password" className="form-control" {...register("password", {required:true})} />
                            {errors.password?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
    
                        <span className="btnsAuth">
                            <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesion</button>
                            <button className="btn btn-secondary btn-block mb-4" onClick={()=> setForm("register")}>Registrarme</button>
                        </span>
                    </form>
                    
                </div>        
            </div>
        </div>
            
        )
    
    }

    return (  
        <>
        { alert && displayAlert(alert)}
        { sendingPostRequest ?  renderPendingRequest() : renderLoginForm()}
        </>
    )
}