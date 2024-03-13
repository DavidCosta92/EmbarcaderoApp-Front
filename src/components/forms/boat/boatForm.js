// @ts-nocheck
import "./boatForm.css"
import { useContext, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../utils/authContext";
import { useForm } from 'react-hook-form';
import { request } from "../../utils/axios_helper";
import CustomAlert from "../../alert/customAlert";
import { RecordFormContext } from "../../../providers/recordFormProvider";

export default function BoatForm ({handleClose, renderAlert}){    
    const { renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    const {record , setRecord , person , setPerson } =  useContext(RecordFormContext)
    
    const { register, formState:{isValid,errors}, handleSubmit, watch , reset} = useForm()

    const [ showLicenseBoatInput, setShowLicenseBoatInput ] = useState(false) // muestra el INPUT para poner licencia
    const [ showAllLicenseForm, setShowAllLicenseForm] = useState(false) //muestra todos los campos de detalles de licencia..

    const [ loadingBoatForm, setloadingBoatForm ] = useState(false)
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    const [ licenseToShowFromDb, setLicenseToShowFromDb] = useState(false)


    const sendForm = (data) =>{
        if (isValid){
            let recordUpd = {...record}
            if(data?.hasLicense == true){
                data.typeSimpleBoat_enum = null
                recordUpd.simpleBoat = null
                recordUpd.license = data
            } else if (data?.hasLicense == false){
                recordUpd.license = null
                recordUpd.simpleBoat = data
            }
            setRecord(recordUpd)
            renderAlert("Embarcacion elegida", "Exito", "success",4000)          
            handleClose()
        }     
        
    }

    const checkLicenseField = (event)=>{                
        setShowLicenseBoatInput(event.target.checked)
    }

    const licenseFielChangeHandler = (event) =>{
        const license = event.target.value   
        if(license.length >=5){ // MAYOR DE 5 CARACTERES? MSJ01 Seria lo minimo..
            setloadingBoatForm(true)
            getLicenseDetails(license)
            // Y SI ESTA ACTIVO, PERMITIR GUARDARLO - SI NO ESTA ACTIVO, MOSTRAR EL BOTON COMO disabled
            // si le da a guardar, solo enviar el codigo de matricula, que es lo que necesito para crear el nuevo registro!

        } else {
            setloadingBoatForm(false)
            setShowAllLicenseForm(false)
        }
    }
    const getLicenseDetails = (license)=>{
        request(
            "GET",
            `licences/licenseCode/${license}`,
            {}).then(
            (response) => {          
                setloadingBoatForm(false)
                setLicenseToShowFromDb(response.data)
            })
            .catch((error) => {   
                setloadingBoatForm(false) 
                if(error.response?.status == 404){
                    setLicenseToShowFromDb({
                            "licenseCode": "",
                            "registeredBoat": {
                                "engine": {
                                    "engineType_enum": "",
                                    "engineNumber": "",
                                    "cc": "",
                                    "notes": ""
                                },
                                "hull": "",
                                "name": "",
                                "capacity": "",
                                "details": "",
                                "typeLicencedBoat_enum": ""
                            },
                            "owner": {
                                "dni": "",
                                "name": "",
                                "lastName": "",
                                "phone": "",
                                "emergency_phone": "",
                                "address": "",
                                "notes": ""
                            },
                            "licenseState_enum": "",
                            "notes": ""
                       })
                }                
            }
        ) 
    }
    useEffect(() => {
        if (licenseToShowFromDb) {
            let boat = licenseToShowFromDb.registeredBoat
            let engine = boat.engine
            let owner = licenseToShowFromDb.owner
            reset({
                "licenseCode": licenseToShowFromDb.licenseCode,
                "registeredBoat": {
                    "engine": {
                        "engineType_enum": engine.engineType_enum,
                        "engineNumber": engine.engineNumber,
                        "cc": engine.cc,
                        "notes": engine.notes
                    },
                    "hull": boat.hull,
                    "name": boat.name,
                    "capacity": boat.capacity,
                    "details": boat.details,
                    "typeLicencedBoat_enum": boat.typeLicencedBoat_enum
                },
                "owner": {
                    "dni": owner.dni,
                    "name": owner.name,
                    "lastName": owner.lastName,
                    "phone": owner.phone,
                    "emergency_phone": owner.emergency_phone,
                    "address": owner.address,
                    "notes": owner.notes,
                    "fullName" : `${owner.name} ${owner.lastName}`
                },
                "licenseState_enum": licenseToShowFromDb.licenseState_enum,
                "notes": licenseToShowFromDb.notes
           });
            setShowAllLicenseForm(true) 
        }   
    }, [licenseToShowFromDb]);

    function renderAllLicenseForm(){
        return (
            <>                                                                
                <div className="form-outline mb-4 inputDiv">
                    <label className="form-label" htmlFor="licenseCode">Matricula</label>
                    <input type="text" id="licenseCode" name="licenseCode" className="form-control" {...register("licenseCode")}  onChange={licenseFielChangeHandler}/>
                    {errors.licenseCode?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>    
                { loadingBoatForm && renderSpiner()}

                { showAllLicenseForm && (
                    <> 
                    <div className="smallInputContainer">                                                        
                        <div className="form-outline mb-4">
                            <label className= "form-label" htmlFor="licesce">Estado matricula</label>                                
                            <input type="text" id="licenseState_enum" name="licenseState_enum" value={licenseToShowFromDb?.licenseState_enum} className={`form-control licenseState_${licenseToShowFromDb?.licenseState_enum}`} disabled {...register("licenseState_enum")} />
                        </div>        
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="owner.fullName">Dueño</label>
                            <input type="text" id="owner.fullName" name="owner.fullName" className="form-control" disabled {...register("owner.fullName")} />
                        </div>   

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="owner.dni">Dni dueño</label>
                            <input type="text" id="owner.dni" name="owner.dni" className="form-control" disabled {...register("owner.dni")} />
                        </div>   

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.hull">Casco</label>
                            <input type="text" id="registeredBoat.hull" name="registeredBoat.hull" className="form-control" disabled {...register("registeredBoat.hull")} />
                        </div>                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.name">Nombre fantasia</label>
                            <input type="text" id="registeredBoat.name" name="registeredBoat.name" className="form-control" disabled {...register("registeredBoat.name")} />
                        </div>                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.capacity">Capacidad maxima</label>
                            <input type="text" id="registeredBoat.capacity" name="registeredBoat.capacity" className="form-control" disabled {...register("registeredBoat.capacity")} />
                        </div>                                                               
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.typeLicencedBoat_enum">Tipo embarcacion</label>
                            <input type="text" id="registeredBoat.typeLicencedBoat_enum" name="registeredBoat.typeLicencedBoat_enum" className="form-control" disabled {...register("registeredBoat.typeLicencedBoat_enum")} />                                       
                        </div>
                                            
                    {/* ENGINE  */}  
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.engine.engineType_enum">Tipo motor</label>
                            <input type="text" id="registeredBoat.engine.engineType_enum" name="registeredBoat.engine.engineType_enum" className="form-control" disabled {...register("registeredBoat.engine.engineType_enum")} />
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.engine.engineNumber">Numero</label>
                            <input type="text" id="registeredBoat.engine.engineNumber" name="registeredBoat.engine.engineNumber" className="form-control" disabled {...register("registeredBoat.engine.engineNumber")} />
                        </div>                                             
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registeredBoat.engine.cc">Cilindrada</label>
                            <input type="text" id="registeredBoat.engine.cc" name="registeredBoat.engine.cc" className="form-control" disabled {...register("registeredBoat.engine.cc")} />
                        </div>    
                    </div>                                           
                    <div className="form-outline mb-4 textArea">
                        <label className="form-label" htmlFor="registeredBoat.engine.notes">Notas motor</label>
                        <input type="text" id="registeredBoat.engine.notes" name="registeredBoat.engine.notes" className="form-control" disabled {...register("registeredBoat.engine.notes")} />
                    </div>
                    {/* ENGINE  */} 
                                    
                    <div className="form-outline mb-4 textArea">
                            <label className="form-label" htmlFor="notes">Notas sobre matricula</label>
                            <input type="text" id="notes" name="notes" className="form-control" disabled {...register("notes")} />
                    </div>                  
                    {/* BOAT  */}  
                     </>
                )}
                <button type="submit"  className="btn btn-primary btn-block mb-4">Guardar</button>
            </>      
        )
    }
    function renderSimpleBoatForm(){
        return ( 
            <>                                                                
                <div className="form-outline mb-4 inputDiv">
                    <label  htmlFor="typeSimpleBoat_enum">Tipo de embarcacion</label>
                    <select id="typeSimpleBoat_enum" name="typeSimpleBoat_enum" className="form-select" {...register("typeSimpleBoat_enum")}>
                        <option value="SIMPLE_KAYAK">Kayak simple </option>
                        <option value="SUP">Sup </option>
                        <option value="KITESURF">Kitesurf</option>
                        <option value="WINDSURF">Windsurf</option>
                        <option value="OTROS">Otros </option>
                    </select>
                </div>                                                         
                <div className="form-outline mb-4 inputDiv">
                    <label className="form-label" htmlFor="details">Detalles especificos</label>
                    <textarea type="text" id="details" name="details" className="form-control" {...register("details")} />
                    {errors.details?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>                                                             
                <div className="form-outline mb-4 inputDiv">
                    <label className="form-label" htmlFor="notes">Notas</label>
                    <textarea type="text" id="notes" name="notes" className="form-control" {...register("notes")} />
                    {errors.notes?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>                                        

                <button type="submit"  className="btn btn-primary btn-block mb-4">Guardar</button>
            </>                                
        )
    }

    return (  
        <div className="row justify-content-center">
            <div className="">    
                <div className="authForm" >
                    <form onSubmit={handleSubmit(sendForm)} className="boatForm">
                        <p className="funcionalidadPendiente">CAMBIAR POR ESTILOS MATERIAL UI https://mui.com/material-ui/react-text-field/</p>
                        <div className="form-check form-switch mb-4 inputDiv">
                            <input type="checkbox" id="hasLicense" name="hasLicense" className="form-check-input" {...register("hasLicense")} onChange={checkLicenseField}/>
                            <label className="form-check-label" htmlFor="hasLicense">Posee matricula</label>
                        </div>
                        
                        { sendingPostRequest && renderPendingPostRequest()}
                        { showLicenseBoatInput && renderAllLicenseForm() }   
                        { !showLicenseBoatInput && renderSimpleBoatForm()}  
                        
                    </form>
                </div>                
            </div>
        </div>
    )
}