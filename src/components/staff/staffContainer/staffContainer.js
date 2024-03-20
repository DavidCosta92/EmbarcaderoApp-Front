// @ts-nocheck
import { useContext } from "react";
import AddStaffModal from "../addStaff/addStaffModal"
import "./staffContainer.css"
import { AuthContext } from "../../utils/authContext";
import DialogDeleteStaff from "./dialogDeleteStaff";

export default function StaffContainer(){
    const { renderPendingPostRequest, getShiftUser, shift, setShift, shiftHasUpdates, setShiftHasUpdates} = useContext(AuthContext)

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
                        <th scope="col">Email</th>
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
                                <td>{member.email}</td>   
                                <td>{member.role}</td>  
                                <td className="staffActions">
                                    <DialogDeleteStaff shiftId={shift.id} member={member}/>                                                                      
                                </td>  
                            </tr>
                        )}) }
                </tbody>
            </table>                
        </div>
    )
}