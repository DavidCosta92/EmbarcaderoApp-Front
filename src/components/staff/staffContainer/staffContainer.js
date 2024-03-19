// @ts-nocheck
import AddStaffModal from "../addStaff/addStaffModal"
import "./staffContainer.css"

export default function StaffContainer({staff}){
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
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { staff?.map( (member) => {
                        return(
                            <tr key={member.id}>
                                <th scope="row">{member.id}</th>
                                <td>{member.username}</td>
                                <td>{member.dni}</td>
                                <td>{member.firstName}</td>      
                                <td>{member.lastName}</td>  
                                <td>{member.phone}</td>   
                                <td>{member.role}</td>  
                                <td>
                                    <a href="#" className="btn btn-danger btn-lg" tabIndex="-1" role="button" aria-disabled="true">Btn eliminar staff (pendiente) </a>
                                    
                                </td>  
                            </tr>
                        )}) }
                </tbody>
            </table>                
        </div>
    )
}