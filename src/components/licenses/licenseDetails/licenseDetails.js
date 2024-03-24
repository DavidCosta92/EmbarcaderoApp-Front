// @ts-nocheck
import { useParams } from "react-router-dom";
import "./licenseDetails.css"

export default function LicenseDetails(){

    const {id} = useParams();

    return(
        <>
            <h1 className="funcionalidadPendiente">Detalles de matricula con id {id}</h1>
        </>
    )
}