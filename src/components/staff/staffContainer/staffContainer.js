// @ts-nocheck
import "./staffContainer.css"

export default function StaffContainer({staff}){
    return (
        <div className="alert alert-secondary staffContainer">
            <span className="tableHeader">
                <h4>Personal</h4>
                <a href="#" class="btn btn-success btn-lg" tabindex="-1" role="button" aria-disabled="true">Link Agregar nuevo staff (pendiente) </a>
            </span>

            <table class="table table-secondary table-striped">
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
                    { staff.map( (member) => {
                        return(
                            <tr>
                                <th scope="row">{member.id}</th>
                                <td>{member.username}</td>
                                <td>{member.dni}</td>
                                <td>{member.firstName}</td>      
                                <td>{member.lastName}</td>  
                                <td>{member.phone}</td>   
                                <td>{member.role}</td>  
                                <td>
                                    <a href="#" class="btn btn-danger btn-lg" tabindex="-1" role="button" aria-disabled="true">Btn eliminar staff (pendiente) </a>
                                    
                                </td>  
                            </tr>
                        )}) }
                </tbody>
            </table>                
        </div>
    )
}