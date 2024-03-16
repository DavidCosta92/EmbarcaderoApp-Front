// @ts-nocheck
import { Alert, Card, CardContent, Typography } from "@mui/material"
import AdminDashboard from "./admin/adminDashboard"
import "./dashboard.css"
import LifeguardDashboard from "./lifeguard/lifeguardDashboard"
import OfficeDashboard from "./office/officeDashboard"
import * as React from 'react';

export default function Dashboard ({role}){
    function renderRoleIncomplete(){
        return(     
            <div className="alertRoleContainerDashboard">                 
                <Alert variant="filled" severity="error">
                    <h3>AUN NO TIENES ROL ASIGNADO</h3>
                    <h5> Debes comunicarte con el administrador del sitio para que te asgine un rol</h5>
                </Alert>
            </div>
        )
    }
    return(
        <div className="container-fluid ">
            { role === "USER" && renderRoleIncomplete() }
            { role === "LIFEGUARD" && <LifeguardDashboard/> }
            { role === "OFFICE" && <OfficeDashboard /> }
            { role === "ADMIN" && <AdminDashboard /> }
        </div>
    )
}