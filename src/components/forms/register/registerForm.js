// @ts-nocheck
import "./registerForm.css"

import { useContext, useEffect, useState} from "react";
import { AuthContext } from '../../utils/authContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../utils/alertContex";

export default function RegisterForm({setForm}){
    const {registerUser, sendingPostRequest , renderPendingPostRequest, error} = useContext(AuthContext)
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)    
    
    const { register, formState:{errors}, handleSubmit, watch } = useForm()

    const password = watch("password1");
    const confirmPassword = watch("password2");

    const sendForm = (data) =>{     
        registerUser (data)        
    }     

    function renderRegisterForm(){
        return(            
            <div className="row justify-content-center">
            <div className="">    
            {/*  FORM REGISTER */}
                <div className="authForm" >
                    <form onSubmit={handleSubmit(sendForm)} className="registerForm">
                        
                        <div className="form-floating mb-4 inputDiv">
                        <label className="form-label" htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" className="form-control" {...register("email", {required:true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
                            {errors.email?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                            {errors.email?.type === "pattern" && <p className="inputFormError">Formato esperado: <b>tuEmail@cuenta.com</b></p>}
                        </div>
                        
                        <div className="form-floating mb-4 inputDiv">
                            <label className="form-label" htmlFor="firstName">First name</label>
                            <input type="text" id="firstName" name="firstName" className="form-control" {...register("firstName", {required:true, minLength: 2 , maxLength:30 , pattern: /^[A-Za-z\s]*$/ })} />
                            {errors.firstName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                            {(errors.firstName?.type === "minLength" || errors.firstName?.type === "maxLength") && <p className="inputFormError">El campo debe tener entre 2 y 30 caracteres</p>}
                            {errors.firstName?.type === "pattern" && <p className="inputFormError">El campo solo permite letras y espacios de forma opcional</p>}
                        </div>        
                        
                        <div className="form-floating mb-4 inputDiv">
                            <label className="form-label" htmlFor="lastName">Last name</label>
                            <input type="text" id="lastName" name="lastName" className="form-control" {...register("lastName", {required:true,minLength: 2 , maxLength:30 , pattern:/^[A-Za-z\s]*$/ })} />
                            {errors.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                            {(errors.lastName?.type === "minLength" || errors.lastName?.type === "maxLength") && <p className="inputFormError">El campo debe tener entre 2 y 30 caracteres</p>}
                            {errors.lastName?.type === "pattern" && <p className="inputFormError">El campo solo permite letras y espacios de forma opcional</p>}
                        </div>
                        
                        <div className="form-floating mb-4 inputDiv">
                            <label className="form-label" htmlFor="registerUsername">Username</label>
                            <input type="text" id="registerUsername" name="username" className="form-control" {...register("username", {required:true, minLength: 2 , maxLength:30, pattern:/^[A-Za-z0-9]+$/ })} />
                            {errors.username?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                            {(errors.username?.type === "minLength" || errors.username?.type === "maxLength") && <p className="inputFormError">El campo debe tener entre 2 y 30 caracteres</p>}
                            {errors.username?.type === "pattern" && <p className="inputFormError">El campo solo permite letras y numeros</p>}
                        </div>
                        
                        <div className="form-floating mb-4 inputDiv">
                        <label className="form-label" htmlFor="dni">Dni</label>
                            <input type="text" id="dni" name="dni" className="form-control" {...register("dni", {required:true, minLength: 8 , maxLength:10 , pattern:/^\d+$/ })} />
                            {errors.dni?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                            {(errors.dni?.type === "minLength" || errors.dni?.type === "maxLength") && <p className="inputFormError">El campo debe tener entre 8 y 10 caracteres</p>}
                            {errors.dni?.type === "pattern" && <p className="inputFormError">El campo solo permite numeros</p>}
                        </div>

                        <div className="form-floating mb-4 inputDiv">
                            <label className="form-label" htmlFor="password1">Password</label>
                            <input type="password" id="password1" name="password1" className="form-control" {...register("password1", {required:true})} />
                        {errors.password1?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        
                        <div className="form-floating mb-4 inputDiv">
                            <label className="form-label" htmlFor="password2">Confirm password</label>
                            <input type="password" id="password2" name="password2" className="form-control" {...register("password2", {required:true})} />
                        {errors.password2?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        {password !== confirmPassword && <p className="inputFormError">Las contraseñas no coinciden</p>}
                        </div>
                        
                        <div className="form-floating mb-4 inputDiv">
                        <label className="form-label" htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" className="form-control" {...register("phone", {required:true, minLength: 9 , maxLength:14, pattern: /^\+?\d+$/ })} />
                            {errors.phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                            {(errors.phone?.type === "minLength" || errors.phone?.type === "maxLength") && <p className="inputFormError">El campo debe tener entre 9 y 14 caracteres</p>}
                            {errors.phone?.type === "pattern" && <p className="inputFormError">El campo solo admite numeros, y de forma opcional,un signo + al inicio</p>}
                        </div>
                        
                        <span className="btnsAuth">
                            <button type="submit" className="btn btn-primary btn-block mb-4">Registrarme</button>    
                            <button className="btn btn-secondary btn-block mb-4" onClick={()=> setForm("login")}>Iniciar sesion</button>
                        </span>
                
                    </form>
                </div>
            
            </div>
        </div>
        )

    }
    
    useEffect(()=>{
        if(error){
            renderAlert(`Cod: ${error.status}, ${error.message}`, "Error", "error", 6000)
        }
    }, [error])

    function renderPendingRequest(){
        return (
            <div className="registerPostRequestContainter">
                {renderPendingPostRequest()}
            </div>
        )
    }
    return (  
        <>
        {alert && displayAlert(alert)}
        { sendingPostRequest ?  renderPendingRequest() : renderRegisterForm()}
        </>
    )
}