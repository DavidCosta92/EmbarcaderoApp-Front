// @ts-nocheck
import "./registerForm.css"

import { useContext} from "react";
import {request , setAuthToken , setAuthHeader} from "../../utils/axios_helper"
import { AuthContext } from '../../utils/authContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export default function RegisterForm({setForm}){
    const {setLoguedUser} = useContext(AuthContext)
    
    const { register, formState:{errors}, handleSubmit, watch } = useForm()
    const navigate = useNavigate()

    const sendForm = (data) =>{
        console.log(data)
        
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
                setAuthHeader(resp.data.token);
                setAuthToken(resp.data.token)
                setLoguedUser(resp.data)
                navigate("/dashboard")  

            })
            .catch( (error) =>{
                console.log(" ======== error >>>>"+error) 
                setAuthHeader(null);
            })
      }



    return (  
        <div className="row justify-content-center">
            <div className="col-4">    
            {/*  FORM REGISTER */}
                <div className="tab-pane" id="pills-register" >
                    <form onSubmit={handleSubmit(sendForm)}>
                        <div className="form-outline mb-4">
                        <input type="text" id="firstName" name="firstName" className="form-control" {...register("firstName", {required:true})} />
                        <label className="form-label" htmlFor="firstName">First name</label>
                        {errors.firstName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
        
                        <div className="form-outline mb-4">
                        <input type="text" id="lastName" name="lastName" className="form-control" {...register("lastName", {required:true})} />
                        <label className="form-label" htmlFor="lastName">Last name</label>
                        {errors.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-outline mb-4">
                        <input type="password" id="password1" name="password1" className="form-control" {...register("password1", {required:true})} />
                        <label className="form-label" htmlFor="password1">Password</label>
                        {errors.password1?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-outline mb-4">
                        <input type="password" id="password2" name="password2" className="form-control" {...register("password2", {required:true})} />
                        <label className="form-label" htmlFor="password2">Confirm password</label>
                        {errors.password2?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-outline mb-4">
                        <input type="text" id="phone" name="phone" className="form-control" {...register("phone", {required:true})} />
                        <label className="form-label" htmlFor="phone">Phone</label>
                        {errors.phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-outline mb-4">
                        <input type="text" id="dni" name="dni" className="form-control" {...register("dni", {required:true})} />
                        <label className="form-label" htmlFor="dni">Dni</label>
                        {errors.dni?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-outline mb-4">
                        <input type="text" id="email" name="email" className="form-control" {...register("email", {required:true})} />
                        <label className="form-label" htmlFor="email">Email</label>
                        {errors.email?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
                        <div className="form-outline mb-4">
                        <input type="text" id="registerUsername" name="username" className="form-control" {...register("username", {required:true})} />
                        <label className="form-label" htmlFor="registerUsername">Username</label>
                        {errors.username?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                        </div>
        
                        <button type="submit" className="btn btn-primary btn-block mb-3">Registrarme</button>
                    </form>
                    <button type="submit" className="btn btn-secondary btn-block mb-4" onClick={()=> setForm("login")}>Iniciar sesion</button>
                </div>
            
            </div>
        </div>

    )
}