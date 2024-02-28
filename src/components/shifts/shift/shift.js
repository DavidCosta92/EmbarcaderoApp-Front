// @ts-nocheck
import "./shift.css"
import RecordsContainer from "../../records/recordsContainer/recordsContainer.js"
import StaffContainer from "../../staff/staffContainer/staffContainer.js"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext.js";

export default function Shift (){    

    const {getShiftUser, renderSpiner, shift, loadingShift, setLoadingShift} = useContext(AuthContext)


    useEffect(()=>{
        setLoadingShift(true)
        getShiftUser()
    }, [])

    function renderShift (){
        if(shift){
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
                            <a href="#" className="btn btn-warning btn-lg" tabIndex="-1" role="button" aria-disabled="true">Btn EDITAR guardia, lleva a pantalla para editar.. </a> 
                                                   
                            <a href="#" className="btn btn-danger btn-lg" tabIndex="-1" role="button" aria-disabled="true">Btn cerrar guardia, previo modal para confirmar (pendiente) </a> 
                        </div>
                    )}
                    
                </div>
            )
        } else{
            return (
                <div className="actualShift">
                    <div className="header">
                        <h5 className="">No hay guardia cargada para el usuario</h5>                 
                    </div>      
                </div>
            )
        }

    }

    return (      
        <>
        {loadingShift?  renderSpiner() : renderShift()}
        </>
    )
}

