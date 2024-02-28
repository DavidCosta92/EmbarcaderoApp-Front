// @ts-nocheck
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const postNewRecordRequest = (record) =>{
    request(
        "POST",
        "records/",
        record
        ).then((response) => {      
            return response.data
        }).catch(
        (error) => {
            console.log("error >>>> "+ error)
            return null
        }
    )
}

export const updateRecordRequest = (id, record) =>{
    request(
        "PATCH",
        `records/${id}`,
        record
        ).then((response) => {      
            console.log("response >>>> "+ response)
            console.log("response >>>> "+ response.data)
            //setPendingPostRequest(false)   

        }).catch(
        (error) => {
            console.log("error >>>> "+ error)
            //setPendingPostRequest(false)   
        }
    )
}
export const getRecordByIdRequest = (idRecord) =>{
    request(
        "GET",
        `records/${idRecord}`,
        {}).then(
        (response) => {                
            return  response.data
        }).catch(
        (error) => {
            return null
        }
    );        
}

/*
export const getShiftByIdRequest = (idUser)=>{      
)

}
export const getUserDetailsRequest = (token) =>{
}

export const loginUserRequest = (usernameAtt , passwordAtt) =>{
}
export const registerUserRequest = (data) =>{
}
*/


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