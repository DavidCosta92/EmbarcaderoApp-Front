// @ts-nocheck
import "./record.css"

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
            <td>
                <table class="table table-secondary">
                    <tbody>
                        <tr><td>{record.boat.name}</td></tr> 
                        <tr><td>{record.boat.typeBoat_enum}</td></tr>   
                        <tr><td>Ver mas datos! (Hacer link)</td></tr>                                       
                    </tbody>
                </table>  
            </td>                   
            <td>
                <table class="table table-secondary ">
                    <tbody>
                        <tr><td>{record.person.name} {record.person.lastName}</td></tr>
                        <tr><td>{record.person.phone} - {record.person.emergency_phone}</td></tr>     
                        <tr><td>Ver mas datos! (Hacer link)</td></tr>                                         
                    </tbody>
                </table>  
            </td>
            <td>{record.numberOfGuests}</td>
            <td>{record.car}</td>
            <td>{record.notes}</td>   
            <td>
                <a href="#" class="btn btn-warning btn-lg" tabindex="-1" role="button" aria-disabled="true">Btn editar (pendiente) </a>
            </td>  
        </tr>
    )
}