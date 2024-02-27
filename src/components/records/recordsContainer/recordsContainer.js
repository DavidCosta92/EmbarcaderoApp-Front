// @ts-nocheck
import Record from "../record"
import { Link } from "react-router-dom";
import "./recordsContainer.css"

export default function RecordsContainer({records}){  
    return (
        <div className="alert alert-secondary recordContainer">
            <span className="tableHeader">
                <h4>Registros de la guardia</h4>
                <Link to="/addNewRecord" className="btn btn-success btn-lg" role="button">Nuevo registro</Link>
            </span>

            <table class="table table-secondary table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Inicio</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Tipo Emb</th>
                        <th scope="col">Nombre Emb</th>
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
                            <Record record={rec}/>
                        )}) }
                </tbody>
            </table>                
        </div>
    )
}