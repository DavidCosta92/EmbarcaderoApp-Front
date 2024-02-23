// @ts-nocheck
import './authForm.css'

import * as React from 'react';
import classNames from 'classnames';




export default class LoginFrom extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            active : "login",
            dni : "",            
            email : "",
            firstName : "",
            lastName : "",
            password1 : "",
            password2 : "",
            phone : "",
            username : "",
            onLogin : props.onLogin,
            onRegister : props.onRegister
        }
    }

    onChangeHandler = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState( { [name] : value } )
    }

    onSubmitLogin = (e) => {
        this.state.onLogin (e , this.state.username , this.state.password)
    }

    onSubmitRegister = (e) =>{
        this.state.onRegister(
            e,
            this.state.dni,
            this.state.email,    
            this.state.firstName,      
            this.state.lastName,
            this.state.password1,
            this.state.password2,  
            this.state.phone,
            this.state.username 
        )
    }


    render() {
        return (
        <div className="row justify-content-center">
            <div className="col-4">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
                  onClick={() => this.setState({active: "login"})}>Login</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
                  onClick={() => this.setState({active: "register"})}>Register</button>
              </li>
            </ul>

            <div className="tab-content">
            {/* FORM LOGIN */}
              <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
                <form onSubmit={this.onSubmitLogin}>
                  <div className="form-outline mb-4">
                    <input type="login" id="loginUsername" name= "username" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="loginUsername">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesion</button>

                </form>
              </div>
              
            {/* FORM REGISTER */}
              <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                <form onSubmit={this.onSubmitRegister}>
                  <div className="form-outline mb-4">
                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="firstName">First name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="lastName">Last name</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="password1" name="password1" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="password1">Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="password2" name="password2" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="password2">Confirm password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="phone" name="phone" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="phone">Phone</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="dni" name="dni" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="dni">Dni</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="email" name="email" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="email">Email</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="registerUsername" name="username" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="registerUsername">Username</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-3">Registrarme</button>
                </form>
              </div>
            </div>
            </div>
        </div>
        );
    };

}