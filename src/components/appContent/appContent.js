// @ts-nocheck
import * as React from 'react'
import WelcomeContent from '../welcomeContent/WelcomeContent'
import AuthContent from "../authContent/authContent"
import LoginFrom from '../forms/authForm/authForm'
import {request , setAuthToken , setAuthHeader} from "../utils/axios_helper"
import Buttons from '../buttons/Buttons'

export default class AppContent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            componentToShow : "welcome"
        }
    }

    login = () =>{
        this.setState( { componentToShow : "login"})
    }

    logout = () =>{
        this.setState( { componentToShow : "welcome"})
    }

    onLogin = (e , username, password) =>{
        e.preventDefault()
        request(
                "POST" ,
                "auth/login",                
                { 
                    username : username , 
                    password : password
                } )
            .then( (resp) =>{ 
                setAuthToken(resp.data.token)
                this.setState( {componentToShow : "loguedUser"} )
            })
            .catch( (error) =>{
                console.log(" ======== error >>>>"+error)                
                setAuthHeader(null);
                this.setState( {componentToShow : "welcome" /* ACA DEBERIA IR EL elemento A MOSTRAR SI TODO MAL */} ) 
            })
    }

    onRegister = (e , dni, email , firstName, lastName, password1, password2, phone, username) =>{
        e.preventDefault()
        request(
                "POST" ,
                "auth/register",
                { 
                    username : username , 
                    password1 : password1,
                    password2 : password2, 
                    lastName : lastName,
                    firstName : firstName, 
                    phone : phone,
                    dni : dni,
                    email : email
                } )
            .then( (resp) =>{ 
                setAuthHeader(resp.data.token);
                this.setState( {componentToShow : "loguedUser"} ) 
                setAuthToken(resp.data.token)
            })
            .catch( (error) =>{
                setAuthHeader(null);
                this.setState( {componentToShow : "welcome" /* ACA DEBERIA IR EL elemento A MOSTRAR SI TODO MAL */} ) 
            })
    }


    render (){
        return(
            <div>
                <Buttons login={this.login} logout={this.logout} />
                {this.state.componentToShow === "welcome" && <WelcomeContent/>}
                {this.state.componentToShow === "loguedUser" && <AuthContent/>}
                {this.state.componentToShow === "login" && <LoginFrom onLogin={this.onLogin} onRegister={this.onRegister}/>}
            </div>
        )
    }
}