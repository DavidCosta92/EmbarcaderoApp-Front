// @ts-nocheck
import Record from "../record"
import { Link } from "react-router-dom";
import "./recordsContainer.css"
import SailingIcon from '@mui/icons-material/Sailing';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { Badge } from "@mui/material";

export default function RecordsContainer({records}){      

    if(records.length !=0){
        let activePersons = 0
        let activeBoats = 0     
            records.map(rec=>{
                if(rec.recordState == "ACTIVO"){
                    activePersons += rec.numberOfGuests +1 // invitados + timonel
                    activeBoats +=1
                }
            })   
        return (
            <div className="alert alert-secondary recordContainer">
                <span className="tableHeader">
                    <h4>Registros de la guardia</h4>
                    <span className="tableHeaderActions">                        
                        <div>
                            <Badge badgeContent={activePersons} max={99} color="info" >
                                <PersonIcon color="action" fontSize="large"/>
                            </Badge>
                            <Badge badgeContent={activeBoats} max={99} color="info">
                                <SailingIcon color="action" fontSize="large"/>
                            </Badge>   
                        </div>
                        <Link to="/addNewRecord" className="btn btn-success btn-lg" role="button">Nuevo registro</Link>
                    </span>
                </span>
                

                <table className="table table-secondary table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Inicio</th>
                            <th scope="col">Fin</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Tipo Emb</th>
                            <th scope="col">Detalles Emb</th>
                            <th scope="col">Persona</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Invitados</th>
                            <th scope="col">Auto</th>
                            <th scope="col">Notas</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { records.map( (rec) => {
                            return(
                                <Record record={rec} key={rec.id}/>
                            )}) }
                    </tbody>
                </table>                
            </div>
        )
    } else{
        return(
            <div className="alert alert-secondary recordContainer">
                <span className="tableHeader">
                    <h4>No hay registros guardados aun</h4>
                    <Link to="/addNewRecord" className="btn btn-success btn-lg" role="button">Nuevo registro</Link>
                </span>
            </div>
        )
    }

}