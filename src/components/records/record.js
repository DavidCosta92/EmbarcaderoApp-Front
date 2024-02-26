// @ts-nocheck
import "./record.css"
import { Link } from "react-router-dom";

export default function Record ({record}){ 
    
    /*
            "id": 13,
            "startTime": 1708732891969,
            "endTime": null,
            "recordState": "ACTIVO",
            "boat": {
                "id": 2,
                "engine": {
                    "id": 2,
                    "engineType_enum": "MOTOR_INTERNO",
                    "engineNumber": "0000005",
                    "cc": "150",
                    "notes": "no se que poern en notas"
                },
                "hull": "duper",
                "name": "duppper",
                "capacity": 3,
                "typeBoat_enum": "LANCHA"
            },
            "person": {
                "id": 1,
                "dni": "35924410",
                "phone": "2644647572",
                "name": "ailin",
                "lastName": "cantoni",
                "emergency_phone": "2648572885",
                "address": "correa",
                "notes": "dasfmq"
            },
            "numberOfGuests": 2,
            "car": "AE735AF",
            "notes": "llegan las obs /?"
            */
           
    return (
        <tr>
            <th scope="row">{record.id}</th>
            <td>{record.startTime}</td>
            <td>{record.endTime}</td>
            <td>{record.recordState}</td>      
            <td>{record.boat.typeBoat_enum}</td>      
            <td>{record.boat.name}</td>                   
            <td>{record.person.lastName} {record.person.name}</td>
            <td>{record.person.phone} - {record.person.emergency_phone}</td>
            <td>{record.numberOfGuests}</td>
            <td>{record.car}</td>
            <td>{record.notes}</td>   
            <td>
                <Link to={`/recordDetails/${record.id}`} className="btn btn-outline-success" role="button">Ver mas</Link>
            </td>  
        </tr>
    )
}