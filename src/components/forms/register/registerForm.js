// @ts-nocheck
import "./registerForm.css"

import { useContext} from "react";
import { AuthContext } from '../../utils/authContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export default function RegisterForm({setForm}){
    const {loguedUser, setLoguedUser, registerUser, loadingUser} = useContext(AuthContext)
    
    const { register, formState:{errors}, handleSubmit, watch } = useForm()
    const navigate = useNavigate()

    const sendForm = (data) =>{        
        registerUser (data)        
      }



    return (  
        <div className="row justify-content-center">
            <div className="">    
            {/*  FORM REGISTER */}
                <div className="authForm" >
                    <form onSubmit={handleSubmit(sendForm)} className="registerForm">
                        
                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="firstName">First name</label>
                            <input type="text" id="firstName" name="firstName" className="form-control" {...register("firstName", {required:true})} />
                            {errors.firstName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
        
                        
                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="lastName">Last name</label>
                            <input type="text" id="lastName" name="lastName" className="form-control" {...register("lastName", {required:true})} />
                        {errors.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        
                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="registerUsername">Username</label>
                            <input type="text" id="registerUsername" name="username" className="form-control" {...register("username", {required:true})} />
                        {errors.username?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        
                        <div className="form-outline mb-4 inputDiv">
                        <label className="form-label" htmlFor="dni">Dni</label>
                            <input type="text" id="dni" name="dni" className="form-control" {...register("dni", {required:true})} />
                            {errors.dni?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>

                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="password1">Password</label>
                            <input type="password" id="password1" name="password1" className="form-control" {...register("password1", {required:true})} />
                        {errors.password1?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        
                        <div className="form-outline mb-4 inputDiv">
                            <label className="form-label" htmlFor="password2">Confirm password</label>
                            <input type="password" id="password2" name="password2" className="form-control" {...register("password2", {required:true})} />
                        {errors.password2?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        
                        <div className="form-outline mb-4 inputDiv">
                        <label className="form-label" htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" className="form-control" {...register("phone", {required:true})} />
                            {errors.phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        
                        <div className="form-outline mb-4 inputDiv">
                        <label className="form-label" htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" className="form-control" {...register("email", {required:true})} />
                            {errors.email?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
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