// @ts-nocheck
import "./boatForm.css"
import { useContext, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../utils/authContext";
import { useForm } from 'react-hook-form';
import { request } from "../../utils/axios_helper";
import CustomAlert from "../../alert/customAlert";

export default function BoatForm ({handleClose , personSelected, setPersonSelected, renderAlert}){

    const {loguedUser, setLoguedUser, registerUser, loadingUser, renderSpiner, renderPendingPostRequest} = useContext(AuthContext)
    
    const { register, formState:{errors}, handleSubmit, watch , reset} = useForm()

    const [ showBoatForm, setShowBoatForm ] = useState(false)
    const [ loadingBoatForm, setloadingBoatForm ] = useState(false)

    const [ boat, setBoat] = useState()

    const [ sendingPostRequest , setSendingPostRequest] = useState(false)

    const [ boatFromDb , setBoatFromDb] = useState()
    // const [ areUpdatedFiels , setAreUpdatedFiels] = useState(false)



    const sendForm = (data) =>{ 
/*
        if(personFromDb && !areUpdatedFiels){// Si se encontro por dni, y NO hay cambio de datos, solo seteo persona en el formulario de registro
            renderAlert("Persona elegida", "Exito", "success",4000)        
            setPersonSelected(data)
            handleClose()  
        } else{    
            setSendingPostRequest(true)  
            savePersonSelected(data)
        }
*/
    }

    const checkLicenseField = (event)=>{
        if(event.target.value === "on"){
            setShowBoatForm(true)
        }else{            
            setShowBoatForm(false)
        }
    }


    const renderBoatForm = ()=>{
        return(   
            <>
            <div className="row justify-content-center">
                <div className="">    
                    <div className="authForm" >
                        <form onSubmit={handleSubmit(sendForm)} className="boatForm">
                            <p className="funcionalidadPendiente">CAMBIAR POR ESTILOS DE MATERIAL UI https://mui.com/material-ui/react-text-field/</p>

                            <div className="form-check form-switch mb-4 inputDiv">
                                <input type="checkbox" id="hasLicense" name="hasLicense" className="form-check-input" {...register("hasLicense")} onChange={checkLicenseField}/>
                                <label className="form-check-label" htmlFor="hasLicense">Posee matricula</label>
                            </div>


                            { loadingBoatForm && renderSpiner()}
                            { sendingPostRequest && renderPendingPostRequest()}
                            {showBoatForm && (
                                <>                                                                
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="license">Matricula</label>
                                        <input type="text" id="license" name="license" className="form-control" {...register("license", {required:true})} />
                                        {errors.license?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>                                          

                                    <button type="submit"  className="btn btn-primary btn-block mb-4">Guardar</button>
                                </>                                
                            )}   
                            {!showBoatForm && (
                                <>                                                                
                                    <div className="form-outline mb-4 inputDiv">
                                        <label  htmlFor="typeBoat_enum">Tipo de embarcacion</label>
                                        <select id="typeBoat_enum" name="typeBoat_enum" className="form-select" {...register("typeBoat_enum")}>
                                            <option value="LANCHA">Lancha </option>
                                            <option value="HIDROPEDAL">Hidropedal </option>
                                            <option value="KAYAK">Kayak</option>
                                            <option value="OTROS">Otros </option>
                                        </select>
                                    </div>                                                          
                                    <div className="form-outline mb-4 inputDiv">
                                        <label className="form-label" htmlFor="notes">Notas</label>
                                        <textarea type="text" id="notes" name="notes" className="form-control" {...register("notes", {required:true})} />
                                        {errors.notes?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                                    </div>                                        

                                    <button type="submit"  className="btn btn-primary btn-block mb-4">Guardar</button>
                                </>                                
                            )}  
                            
                        </form>
                    </div>                
                </div>
            </div>
            </>         
        )
    }

    return (  
        <div>            
            {renderBoatForm()}
        
        </div>
    )
}