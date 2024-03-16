// @ts-nocheck
import axios from "axios"

const LOCAL_URL = "http://localhost:5000"
const AWS_URL = "http://embarcadero-vacio-env.eba-z4dzvsrp.us-east-1.elasticbeanstalk.com/"

axios.defaults.baseURL = LOCAL_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const request = (method, url, data) =>{
    let headers = {}
    const token = window.localStorage.getItem("auth_token")
    if(token !== null && token !== "null"){
        headers = { "Authorization" : `Bearer ${token}` }
    }
    return axios ({
        method : method,
        url : url,
        headers : headers,
        data : data
    })
}