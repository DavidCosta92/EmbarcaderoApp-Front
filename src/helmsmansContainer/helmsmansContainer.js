// @ts-nocheck
import "./helmsmansContainer.css"
import HelmsmansList from "./helmsmansList/helmsmansList"

export default function HelmsmansContainer(){
    return (
        <div className="licensesContainer">            
            <h1 className="funcionalidadPendiente"> LISTA TIMONELES, todos aquellos que hayan ido al dique a navegar, o que sean dueños de una embarcacion... falta agregar carnets de conducir, sera para proxima iteracion </h1>       
            <h4 className="funcionalidadPendiente">Aca deberia poner campo de busqueda por dni y nombre de timonel? </h4> 
            <HelmsmansList/>
        </div>
    )
}