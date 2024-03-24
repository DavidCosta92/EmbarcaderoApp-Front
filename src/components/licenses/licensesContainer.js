// @ts-nocheck
import "./licensesContainer.css"
import LicensesList from "./licensesList/licensesList"

export default function LicensesContainer(){
    return (
        <div className="licensesContainer">            
            <h5 className="">Lista completa de matriculas == REVISAR OPCION DE LISTAS VIRTUALIZADAS MAS QUE TABLAS</h5> 
            <h4 className="funcionalidadPendiente">Aca deberia poner campo de busqueda por matricula, nombre embarcacion o dueño </h4> 
            <LicensesList/>
        </div>
    )
}