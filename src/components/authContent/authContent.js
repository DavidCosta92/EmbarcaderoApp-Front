// @ts-nocheck
import * as React from 'react'
import {request, setAuthHeader} from "../utils/axios_helper"
import UserDetails from '../userDetails/userDetails'

import "./authContent.css"
import Dashboard from '../dashboards/dashboard'


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
                { this.state.data && <UserDetails user={this.state.data}/> }
                { this.state.data && <Dashboard user={this.state.data}/>}
            </div>        
        )
      };
    }