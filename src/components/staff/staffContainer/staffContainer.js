// @ts-nocheck
import { useContext, useState } from "react";
import AddStaffModal from "../addStaff/addStaffModal"
import "./staffContainer.css"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AuthContext } from "../../utils/authContext";
import { request } from "../../utils/axios_helper";
import { AlertContext } from "../../utils/alertContex";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

export default function StaffContainer(){

    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const { renderPendingPostRequest, getShiftUser, shift, setShift, shiftHasUpdates, setShiftHasUpdates} = useContext(AuthContext)
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)  

    function deleteStaff(idStaff){        
        setSendingPostRequest(true)
        request(
            "PUT",
            `shifts/${shift.id}/staff/${idStaff}`,
            {}).then(
            (response) => {                
                console.log(response)   
                renderAlert("Usuario Eliminado!", "Exito", "info",4000)   
                setSendingPostRequest(false)
                setShiftHasUpdates(true)
            })
            .catch((error) => {    
                setSendingPostRequest(false)
                if(error.response){
                    console.log(error.response)
                    renderAlert(`Error ${error.response?.status}: ${error.response?.data?.message}`, "Error", "error",5000)  
                }
            }
        ) 
    }


    function viewDetailsUser(idStaff){

        console.log("ACA DEBO RENDERIZAR UN MODAL CON LOS DETALLES DEL USER")

    }



    return (
        <div className="alert alert-secondary staffContainer">
            <span className="tableHeader">
                <h4>Personal</h4>                
                <span className="btnAddStaff">
                    <AddStaffModal/>
                </span>
            </span>

            <table className="table table-secondary table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Username</th>
                        <th scope="col">dni</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Rol</th>
                        <th scope="col" className="staffActionsTHead">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { shift?.staff?.map( (member) => {
                        return(
                            <tr key={member.id}>
                                <th scope="row">{member.id}</th>
                                <td>{member.username}</td>
                                <td>{member.dni}</td>
                                <td>{member.firstName}</td>      
                                <td>{member.lastName}</td>  
                                <td>{member.phone}</td>   
                                <td>{member.role}</td>  
                                <td className="staffActions">
                                    { sendingPostRequest?  renderPendingPostRequest() : (
                                        <>
                                        <ReadMoreIcon color="info" onClick={()=>viewDetailsUser(member.id)} />
                                        <DeleteForeverIcon color="error" onClick={()=>deleteStaff(member.id)} />
                                        </>
                                    ) }                                                                      
                                </td>  
                            </tr>
                        )}) }
                </tbody>
            </table>                
        </div>
    )
}