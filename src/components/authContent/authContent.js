// @ts-nocheck
import * as React from 'react'
import {request, setAuthHeader} from "../utils/axios_helper"

import "./authContent.css"



export default class AuthContent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : []
        }
    }
    componentDidMount() {
        request(
            "GET",
            "auth/userDetails",
            {}).then(
            (response) => {
                this.setState({data: response.data})
            }).catch(
            (error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({data: error.response.code})
                }

            }
        );
    }

    render() {
        return (
            <div>
            { this.state.data &&  (            
                <div className="row justify-content-center">
                    <div className="card" style={{width: "60VW"}}>
                        <div className="card-body">
                            <h5 className="card-title">Usuario logueado</h5>
                            <p className="card-text">Datos:</p>                        
                            <ul>
                                <li> Username: {this.state.data.username}</li>
                                <li> ID: {this.state.data.id}</li>
                                <li> Rol: {this.state.data.role}</li>
                                <li> Token: {this.state.data.token}</li>
                                <li> Dni: {this.state.data.dni}</li>
                                <li> Email: {this.state.data.email}</li>
                                <li> Nombre: {this.state.data.firstName}</li>
                                <li> Apellido: {this.state.data.lastName}</li>
                                <li> Telefono: {this.state.data.phone}</li>
                                {/* <li>Authorities {this.state.data.authorities}</li> */}
                            </ul>                                                
                        </div>
                    </div>
                </div>
            ) }
            </div>
        )
      };
    }