// @ts-nocheck
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:8080'
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