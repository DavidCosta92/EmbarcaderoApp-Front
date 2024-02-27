// @ts-nocheck
import './authForm.css'

import { useContext , useState} from "react";
import { AuthContext } from '../../utils/authContext';
import LoginForm from '../login/loginForm';
import RegisterForm from '../register/registerForm';

export default function AuthForm(){
  const { loguedUser} = useContext(AuthContext)
  const [ activeForm , setActiveForm] = useState("login")

  function renderAuthForm(){
    if (activeForm === "login"){
      return (<LoginForm setForm ={setActiveForm}/>)
    } 
    return( <RegisterForm setForm ={setActiveForm}/>)
  }

  return(
    <>    
    {!loguedUser && renderAuthForm()}
    </>
  )
}

