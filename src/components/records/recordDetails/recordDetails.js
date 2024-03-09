// @ts-nocheck
import "./recordDetails.css"
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {  request } from "../../utils/axios_helper.js";
import { AuthContext } from "../../utils/authContext.js";
import { useForm, useFormState } from 'react-hook-form';
import CustomAlert from "../../alert/customAlert.js";
import PersonModal from "../../modals/persons/personModal.js";


export default function RecordDetails (){
    const {loguedUser , renderSpiner,shift , renderPendingPostRequest, getShiftUser} = useContext(AuthContext)
    const {id} = useParams();
    const {register, formState:{errors, isDirty}, handleSubmit , reset, control} = useForm()
    const { dirtyFields } = useFormState({ control });

    const [ pendingPostRequest , setPendingPostRequest ] = useState (false)   
    const [ loading, setLoading ] = useState(true)   
    const [ record , setRecord ] = useState(null)
    const [ changedRecordState , setChangedRecordState ] = useState(false)
    
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState()



    // modal persona
    // modal persona
    // modal persona
    const [ personBd , setPersonBd] = useState(null)
    const [ personHasUpdates, setPersonHasUpdates] = useState()
    // modal persona
    // modal persona
    // modal persona

/*
    useEffect(()=>{
        if(person){
            record.person = person
        }
    }, [updatedForm])
*/

    // Si se actualiza formulario de persona

    /*
    useEffect(() => {
        console.log("ME ACTUALIZO EN UN USE EFECT PORQUE PERSON HAS UPDATES => "+personBd?.dni)
        if(record){
            let updatedRecord = record
            updatedRecord.person = personBd
            console.log("updatedRecord ====> "+updatedRecord.person.dni)
            setRecord(updatedRecord)
        }
       setPersonHasUpdates(false)
    }, [personHasUpdates]);
    */

    // Al renderizar obtengo record
    useEffect(()=>{ // esto es porque si ya habia cargado el record antes, no lo vuelvo a llamar, lo que permite abrir los modales y cerrarlos sin estar llamando al back cada vez
        if(personHasUpdates){ // si hubieron updates, no recargo desde bd
            console.log("PARECE QUE personHasUpdates => ")
            if(record){
                let updatedRecord = record
                updatedRecord.person = personBd
                console.log("updatedRecord ====> "+updatedRecord.person.dni)
                setRecord(updatedRecord)
            }
        } else{
            const fetchData = async () => {
                console.log("CADA VEZ QUE CIERRO EL MODAL, ESTOY LLAMANDO AL GET RECORD BY ID, LO QUE ME BORRA TODOS LOS DATOS QUE TRAIGO DEL MODAL => ")
                const data =  getRecordById();    
                setRecord(data);
                setLoading(false);
            };
            fetchData(); 
        }
    }, [])

    // cuando tengo record, pido shift
    useEffect(()=>{
        getShiftUser()
    }, [record])

    function updateDataFormAndResetForm(record){
        const format = { year: '2-digit', month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' }
        const start = new Date(record.startTime)
        const end = new Date(record.endTime)
        const simpleBoat = record.simpleBoat
        const person = record.person
        const license = record.license
        const registeredBoat = license?.registeredBoat
        const engine = registeredBoat?.engine
       
        reset({
            "id": id,
            "idShift" : shift?.id,
            "startTime": start.toLocaleString([], format),
            "endTime": record.endTime? end.toLocaleString([], format) : "-- --",
            "recordState": record.recordState,
            "license" : license == null ? null : {
                "id": license.id ,
                "licenseCode": license.licenseCode.toUpperCase(),
                "registeredBoat": {
                    "id": registeredBoat.id,
                    "engine": {
                        "id": engine.id,
                        "engineType_enum": engine.engineType_enum ,
                        "engineNumber": engine.engineNumber ,
                        "cc": engine.cc ,
                        "notes": engine.notes 
                    },
                    "hull": registeredBoat.hull ,
                    "name": registeredBoat.name ,
                    "capacity": registeredBoat.capacity ,
                    "details": registeredBoat.details ,
                    "typeLicencedBoat_enum": registeredBoat.typeLicencedBoat_enum 
                },
                "owner": {
                    "id": license?.owner.id ,
                    "dni": license?.owner.dni ,
                    "name": license?.owner.name ,
                    "lastName": license?.owner.lastName ,
                    "phone": license?.owner.phone ,
                    "emergency_phone": license?.owner.emergency_phone ,
                    "address": license?.owner.address ,
                    "notes": license?.owner.notes ,
                    "fullName" : `${license?.owner.name} ${license?.owner.lastName}`
                },
                "licenseState_enum": license.licenseState_enum,
                "notes": license.notes
            },
            "simpleBoat" : simpleBoat == null ? null : {
                "id": simpleBoat.id,
                "typeSimpleBoat_enum": simpleBoat.typeSimpleBoat_enum,
                "details": simpleBoat.details,
                "notes": simpleBoat.notes
            },
            "person": {
                "id": person.id,
                "dni": person.dni,
                "phone": person.phone,
                "name": person.name,
                "lastName": person.lastName,
                "emergency_phone": person.emergency_phone,
                "address": person.address,
                "notes": person.notes,
                "isUpdate" : person.isUpdate
                },
            "numberOfGuests": record.numberOfGuests,
            "car": record.car,//.toUpperCase(),
            "notes": record.notes
        });

    }
    // cuando tengo todo, reseteo datos por defecto formulario
    useEffect(() => {
        if (record) {
            updateDataFormAndResetForm(record)
        }
    }, [shift]);

    function getRecordById(){      
        console.log("estoy pidiendo datos de record nuevamente => getRecordById()") 
        request(
            "GET",
            `records/${id}`,
            {}).then(
            (response) => {             
                setRecord(response.data)
                setPersonBd(response.data.person)
                setLoading(false) 
            })
            .catch(
            (error) => {    
                setRecord(null)
            }
        )     
    }   
    function changeStyleRecordState(event){
        let recordStateInput = document.getElementById("recordState")
        recordStateInput.className =""
        recordStateInput.classList.add("form-select", `record_${event.target.value}`)
        setChangedRecordState(true)
    }
    function renderAlert(msg, title, style, miliseg){
        setShowAlert(true)
        setAlert({msg:msg, title: title, style: style})
        setTimeout(() => {
            setShowAlert(false);
         }, miliseg);
    }
    function cleanDataForm(data){
        const cleanedData = data
        cleanedData.startTime = record.startTime

        // si NO hubieron cambios en los campos, los elimino para no enviar sin sentido
        if (!dirtyFields.person){
            cleanedData.person = null
        } else{
            cleanedData.person.isUpdate = true
        }
        if (!dirtyFields.recordState){
            cleanedData.recordState = null
        }
        if (!dirtyFields.numberOfGuests){
            cleanedData.numberOfGuests = null
        }
        if (!dirtyFields.car){
            cleanedData.car = null
        }
        if (!dirtyFields.notes){
            cleanedData.notes = null
        }
        
        
        // FIXME
        // campos anidados FALTAON SIMPLE BOAT, REGISTERED BOAT Y EL RESTO DE HIJOS
        // campos anidados FALTAON SIMPLE BOAT, REGISTERED BOAT Y EL RESTO DE HIJOS
        // campos anidados FALTAON SIMPLE BOAT, REGISTERED BOAT Y EL RESTO DE HIJOS
        // campos anidados FALTAON SIMPLE BOAT, REGISTERED BOAT Y EL RESTO DE HIJOS
        /*
        if (!dirtyFields.car){ // si NO hubieron cambios en person, lo elimino para no enviar sin sentido
            console.log("Eliminandoooo ===> car")
            cleanedData.car = null
        }
        */
       

        /*
        TODO ya me fije que funcione modificar registros, solo capo cantidad de invitados, Estado,patente, FALTAN revisar ,  y el resto de cosas para abajo!
        }
        */

        return cleanedData
    }
    const updateRecord = (data) =>{
        
        setPendingPostRequest(true)
        const cleanedData = cleanDataForm(data)

        request(
            "PUT",
            `records/${id}`,
            cleanedData
            ).then((response) => {      
                setRecord(response.data)
                setPendingPostRequest(false) 
                renderAlert("Registro actualizado!", "Exito", "success",4000)
            }).catch(
            (error) => {
                console.log("error >>>> "+ error)
                setPendingPostRequest(false)                 
                renderAlert(error, "Error", "warning",5000)
            }
        )
    }
    function renderSectionPersonForm(){
        return (                
        <div>
            <h5>Persona a cargo</h5>
            <h6 className="funcionalidadPendiente">El usuario deberia hacer click en boton, desplegar modal y funcionara como el de agregar registro.. luego seteo la info al formulario y listo.. NO MODIFICAR ESTE COMPONENTE O HABRA QUE ADAPTAR EL DE AGREGAR REGISTRO..</h6>
            <div className="smallInputContainer">
                <div className="form-floating mb-4">
                    <input type="number" id="person.dni" name="person.dni" className="form-control" {...register("person.dni", {required:true})} disabled/>
                    <label className="form-label" htmlFor="person.dni">Dni</label>
                    {errors.person?.dni?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                                 
                <span className="btnModalPerson funcionalidadPendiente">
                      <PersonModal personBd={personBd} setPersonBd={setPersonBd} setPersonHasUpdates={setPersonHasUpdates}  renderAlert={renderAlert} />
                </span>

                <div className="form-floating mb-4">
                    <input type="text" id="person.name" name="person.name" className="form-control" {...register("person.name", {required:true})} />
                    <label className="form-label" htmlFor="person.name">Nombre</label>
                    {errors.person?.name?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                <div className="form-floating mb-4">
                    <input type="text" id="person.lastName" name="person.lastName" className="form-control" {...register("person.lastName", {required:true})} />
                    <label className="form-label" htmlFor="person.lastName">Apellido</label>
                    {errors.person?.lastName?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                <div className="form-floating mb-4">
                    <input type="number" id="person.phone" name="person.phone" className="form-control" {...register("person.phone", {required:true})} />
                    <label className="form-label" htmlFor="person.phone">Telefono</label>
                    {errors.person?.phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                <div className="form-floating mb-4">
                    <input type="number" id="person.emergency_phone" name="person.emergency_phone" className="form-control" {...register("person.emergency_phone", {required:true})} />
                    <label className="form-label" htmlFor="person.emergency_phone">Telefono</label>
                    {errors.person?.emergency_phone?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                <div className="form-floating mb-4">
                    <input type="text" id="person.address" name="person.address" className="form-control" {...register("person.address", {required:true})} />
                    <label className="form-label" htmlFor="person.address">Direccion</label>
                    {errors.person?.address?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
            </div>
            <div className="form-floating mb-4 textArea">
                <textarea type="text" id="person.notes" name="person.notes" className="form-control" {...register("person.notes")} />
                <label className="form-label" htmlFor="person.notes">Notas sobre persona</label>
            </div>
            <h6 className="funcionalidadPendiente">Aca lo que debo hacer es, como primer paso, poner el dni, y que se levante un modal que muestre todos los datos de la persona,  o vacio si no hay ninguno.. y luego de que se llene o modifique, el boton del modal debe guardar la persona y dejarla seteada</h6>
        </div>
        )
    }

    function renderSectionRegisteredBoatForm(){
        return (
            <div>        
                <h5>Embarcacion (solo lectura)</h5>  
                <div className="smallInputContainer">                                                          
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="licesce.licenseCode">MATRICULA</label>
                        <input type="text" id="license.licenseCode" name="license.licenseCode" className="form-control" disabled {...register("license.licenseCode")} />
                    </div>                                                           
                    <div className="form-outline mb-4">
                        <label className= "form-label" htmlFor="licesce">Estado matricula</label>                                
                        <input type="text" id="license.licenseState_enum" name="license.licenseState_enum" value={record?.license?.licenseState_enum} className={`form-control licenseState_${record?.license?.licenseState_enum}`} disabled {...register("license.licenseState_enum")} />
                    </div>        
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.owner.fullName">Dueño</label>
                        <input type="text" id="license.owner.fullName" name="license.owner.fullName" className="form-control" disabled {...register("license.owner.fullName")} />
                    </div>   

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.owner.dni">Dni dueño</label>
                        <input type="text" id="license.owner.dni" name="license.owner.dni" className="form-control" disabled {...register("license.owner.dni")} />
                    </div>   

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.hull">Casco</label>
                        <input type="text" id="license.registeredBoat.hull" name="license.registeredBoat.hull" className="form-control" disabled {...register("license.registeredBoat.hull")} />
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.name">Nombre fantasia</label>
                        <input type="text" id="license.registeredBoat.name" name="license.registeredBoat.name" className="form-control" disabled {...register("license.registeredBoat.name")} />
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.capacity">Capacidad maxima</label>
                        <input type="text" id="license.registeredBoat.capacity" name="license.registeredBoat.capacity" className="form-control" disabled {...register("license.registeredBoat.capacity")} />
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.typeLicencedBoat_enum">Tipo embarcacion</label>
                        <input type="text" id="license.registeredBoat.typeLicencedBoat_enum" name="license.registeredBoat.typeLicencedBoat_enum" className="form-control" disabled {...register("license.registeredBoat.typeLicencedBoat_enum")} />                                       
                    </div>
                                        
                {/* ENGINE  */}  
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.engine.engineType_enum">Tipo motor</label>
                        <input type="text" id="license.registeredBoat.engine.engineType_enum" name="license.registeredBoat.engine.engineType_enum" className="form-control" disabled {...register("license.registeredBoat.engine.engineType_enum")} />
                    </div>                                             
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.engine.engineNumber">Numero</label>
                        <input type="text" id="license.registeredBoat.engine.engineNumber" name="license.registeredBoat.engine.engineNumber" className="form-control" disabled {...register("license.registeredBoat.engine.engineNumber")} />
                    </div>                                             
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="license.registeredBoat.engine.cc">Cilindrada</label>
                        <input type="text" id="license.registeredBoat.engine.cc" name="license.registeredBoat.engine.cc" className="form-control" disabled {...register("license.registeredBoat.engine.cc")} />
                    </div>    
                </div>                                           
                <div className="form-outline mb-4 textArea">
                    <label className="form-label" htmlFor="license.registeredBoat.engine.notes">Notas motor</label>
                    <input type="text" id="license.registeredBoat.engine.notes" name="license.registeredBoat.engine.notes" className="form-control" disabled {...register("license.registeredBoat.engine.notes")} />
                </div>
                {/* ENGINE  */} 
                                
                <div className="form-outline mb-4 textArea">
                        <label className="form-label" htmlFor="license.notes">Notas sobre matricula</label>
                        <input type="text" id="license.notes" name="license.notes" className="form-control" disabled {...register("license.notes")} />
                </div>                  
            {/* BOAT  */}  
            </div>
        )
    }
            
    function renderSectionSimpleBoatForm(){
        return (
            <div>       
                <h5 className="funcionalidadPendiente">Embarcacion SIN matricula (solo lectura === esto deberia ser editable?)</h5>  
                <div className="smallInputContainer">                                                          
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="simpleBoat.typeSimpleBoat_enum">Tipo embarcacion</label>
                        <input type="text" id="simpleBoat.typeSimpleBoat_enum" name="simpleBoat.typeSimpleBoat_enum" className="form-control" disabled {...register("simpleBoat.typeSimpleBoat_enum")} />
                    </div>                                                               
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="simpleBoat.details">Detalles</label>
                        <input type="text" id="simpleBoat.details" name="simpleBoat.details" className="form-control" disabled {...register("simpleBoat.details")} />
                    </div>                                                                
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="simpleBoat.notes">Notas sobre embarcacion</label>
                        <input type="text" id="simpleBoat.notes" name="simpleBoat.notes" className="form-control" disabled {...register("simpleBoat.notes")} />
                    </div> 
                </div>            
            </div>
        )
    }

    function renderSectionRecordDetails(){
        return (
            <>
            <input type="text" hidden id="idShift" name="idShift" {...register("idShift")} />
            <div className="smallInputContainer">                    
                <div className="form-floating mb-4 ">
                    <select id="recordState" name="recordState" className={`form-select record_${record?.recordState}`} {...register("recordState")} onChange={changeStyleRecordState} >
                        <option value="ACTIVO">Activo </option>
                        <option value="DESCONOCIDO">Desconocido </option>
                        <option value="EGRESADO">Egresado</option>
                        <option value="SINIESTRADO">Siniestrado </option>
                        <option value="ELIMINADO">Eliminado </option>
                    </select>
                    <label  htmlFor="recordState">Estado</label>
                </div>               
                <div className="form-floating mb-4 ">
                    <input type="number" id="numberOfGuests" name="numberOfGuests" className="form-control" min={0} {...register("numberOfGuests", {required:true})} />
                    <label className="form-label" htmlFor="numberOfGuests">Cantidad invitados</label>
                    {errors.numberOfGuests?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                <div className="form-floating mb-4 ">
                    <input type="text" id="car" name="car" className="form-control" {...register("car", {required:true})} />
                    <label className="form-label" htmlFor="car">Patente auto</label>
                    {errors.car?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>
                <div className="form-floating mb-4 ">
                    <input type="text" id="startTime" name="startTime" className="form-control" disabled {...register("startTime")} />
                    <label className="form-label" htmlFor="startTime">Inicio</label>
                </div>   
                <div className="form-floating mb-4 ">
                    <input type="text" id="endTime" name="endTime" className="form-control" disabled {...register("endTime")} />
                    <label className="form-label" htmlFor="endTime">Fin</label>
                </div>   
            </div>    
            <div className="form-floating mb-4 textArea">
                <textarea type="text" id="notes" name="notes" className="form-control" {...register("notes")} />
                <label className="form-label" htmlFor="notes">Notas del registro</label>
            </div>
            </>
        )
    }
    function renderDetailsForm(){
        if(pendingPostRequest === true)  return renderPendingPostRequest ()
        return(
            <form onSubmit={handleSubmit(updateRecord)} className="formRecordDetails">   
                { renderSectionRecordDetails() /* RECORD details header */}                         
                { renderSectionPersonForm() /* PERSON details  */}
                { record?.license &&  renderSectionRegisteredBoatForm() /* BOAT with license */}                
                { record?.simpleBoat && renderSectionSimpleBoatForm() /* SIMPLE BOAT without license */}  
                { (isDirty || changedRecordState )&& <button type="submit" className="btn btn-outline-danger btn-lg funcionalidadPendiente">Editar registro</button>}                
            </form>
        )
    }
    

    return (
        <>
        {showAlert && ( <CustomAlert alertConfig={alert} /> )}

        <div className="alert alert-secondary addRecordForm">
            <h4>Detalles del registro </h4>   
            {loading? renderSpiner() : renderDetailsForm()}   
        </div>
        
        <Link to="/dashboard" className="btn btn-secondary goBackBtn" role="button">Volver</Link>
        </>
    )
}