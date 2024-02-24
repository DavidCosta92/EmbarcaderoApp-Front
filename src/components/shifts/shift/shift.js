// @ts-nocheck
import "./shift.css"
import RecordsContainer from "../../records/recordsContainer/recordsContainer.js"
import StaffContainer from "../../staff/staffContainer/staffContainer.js"
import { request } from "../../utils/axios_helper.js";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Shift ({user}){    

    const [loading, setLoading] = useState (true);
    const [ shift, setShift] = useState ();

    function getShiftByIdUser (idUser){
        request(
            "GET",
            `shifts/user/${idUser}`,
            {}).then(
            (response) => {                
                setShift(response.data)
                setLoading(false)   
            }).catch(
            (error) => {

            }
        );
    }

    useEffect(()=>{
        setLoading(true)
        getShiftByIdUser(user.id)
    }, [])


    function renderSpiner(){
        return(
            <div className="spinner"> 
                <Box sx={{ display: 'flex' }}  className="spinnerWheel">
                    <CircularProgress color="primary" size="lg"/>
                </Box>

            </div>           
        )
    }
    function renderShift (){
        return(
            <div className="actualShift">
                <div className="header">
                    <h5 className="">Datos de la guardia {shift.dam}</h5>      
                    <div>
                        <span>
                            <ul>
                                <li> ID: {shift.id}</li>
                                <li> Fecha: {shift.date}</li>
                                <li> Estado: {shift.close === null && "Activo"}</li>
                            </ul>    
                        </span>     
                    </div>
                    <span className="notes">                            
                        <p> Notas: {shift.notes}</p>
                    </span>                                       
                </div>                    
                <RecordsContainer records={shift.records}/>
                <StaffContainer staff = {shift.staff}/>
                
                {shift.close === null && (
                    <div className="buttons">
                        <a href="#" class="btn btn-warning btn-lg" tabindex="-1" role="button" aria-disabled="true">Btn EDITAR guardia, lleva a pantalla para editar.. </a> 
                                               
                        <a href="#" class="btn btn-danger btn-lg" tabindex="-1" role="button" aria-disabled="true">Btn cerrar guardia, previo modal para confirmar (pendiente) </a> 
                    </div>
                )}
                
            </div>
        )
    }

    return (      
        <>
        {loading?  renderSpiner() : renderShift()}
        </>
    )
}

