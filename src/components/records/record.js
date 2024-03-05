// @ts-nocheck
import "./record.css"
import { Link } from "react-router-dom";

export default function Record ({record}){ 
    const start = new Date(record.startTime)
    const end = new Date(record.endTime)
    const format= { month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' }
    console.log("=================")
    console.log(record.boat)
    console.log(record.boat)
    console.log(record.boat)
    console.log(record.boat)
    console.log("=================")

    return (
        <tr className={`record_${record.recordState}`}>
            <th scope="row">{record.id}</th>
            <td>{start.toLocaleTimeString([], format)}</td>
            <td>{record.endTime? end.toLocaleTimeString([], format) : "-- --"}</td>
            <td>{record.recordState.toLowerCase()}</td>      
            <td>{ record.simpleBoat? record.simpleBoat.typeSimpleBoat_enum : record.license.registeredBoat.typeLicencedBoat_enum +"HARD LICEEEEE DEBERIA IR MATRICULA Y TIPO DE EMBAR"}</td>      
            <td>{ record.simpleBoat? record.simpleBoat.details : record.license.registeredBoat.details+"HARD LICEEEEE " }</td>                   
            <td>{record.person.lastName} {record.person.name}</td>
            <td>{record.person.phone} - {record.person.emergency_phone}</td>
            <td>{record.numberOfGuests}</td>
            <td>{record.car.toUpperCase()}</td>
            <td>{record.notes}</td>   
            <td>
                <Link to={`/recordDetails/${record.id}`} className="btn btn-outline-success" role="button">Ver mas</Link>
            </td>  
        </tr>
    )
}