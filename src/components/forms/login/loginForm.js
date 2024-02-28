// @ts-nocheck
import "./loginForm.css"

import { useContext} from "react";
import { AuthContext } from '../../utils/authContext';
import { useForm } from 'react-hook-form';

export default function LoginForm ({setForm}){
    const { loginUser} = useContext(AuthContext)
    
    const { register, formState:{errors}, handleSubmit, watch } = useForm()

    const sendForm = (data) =>{
        loginUser(data.username , data.password) 
    }

    return(      
    <div className="row justify-content-center">
        <div className="">        
        {/* FORM LOGIN */}
            <div className="authForm">
                <form onSubmit={handleSubmit(sendForm)}>
                    <div className="form-outline mb-4 inputDiv">
                        <label className="form-label" htmlFor="loginUsername">Username</label>
                        <input type="login" id="loginUsername" name= "username" className="form-control" {...register("username", {required:true, maxLength:20 })}  />
                        {errors.username?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        {errors.username?.type === "maxLength" && <p className="inputFormError">Largo maximo de 20 caracteres</p>}
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