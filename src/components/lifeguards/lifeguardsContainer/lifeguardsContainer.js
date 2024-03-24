// @ts-nocheck
import LifeguardList from "../lifeguardList/lifeguardList"
import "./lifeguardsContainer.css"

export default function LifeguardsContainer(){
    return (
        <>
        <h1 className="funcionalidadPendiente"> Lista de usuarios con rol guardavida</h1>    
        <h4 className="funcionalidadPendiente">Aca deberia poner campo de busqueda por dni y nombre del gv? </h4> 
        <LifeguardList/>    
        </>
    )
}