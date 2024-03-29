// @ts-nocheck
import "./shift.css"
import RecordsContainer from "../../records/recordsContainer/recordsContainer.js"
import StaffContainer from "../../staff/staffContainer/staffContainer.js"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/authContext.js";
import { useForm } from "react-hook-form";
import { request } from "../../utils/axios_helper.js";
import { AlertContext } from "../../utils/alertContex.js";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SendReportModal from "../../modals/sendReport/sendReport.js";
import CloseShiftModal from "../../modals/closeShift/closeShiftModal.js";

export default function Shift (){    
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)
    const { loguedUser,renderPendingPostRequest, getShiftUser, renderSpiner, shift, setShift, loadingShift, setLoadingShift, shiftHasUpdates, setShiftHasUpdates} = useContext(AuthContext)

    const { register, formState:{errors, isDirty}, handleSubmit, watch , control, reset} = useForm()
    const [ sendingPostRequest , setSendingPostRequest] = useState(false)
    
    const [ downloadRequest , setDownloadRequest] = useState(false)
            
    useEffect(()=>{
        getShiftUser()        
    }, [shiftHasUpdates])

    function downloadShiftReport(){
        setDownloadRequest(true)
        request(
            "GET",
            `shifts/shiftResume/${shift.id}`,
            {},
            'blob') // manejar la respuesta como Blob, axios ya me lo deja como blob
            .then((response) => {                
                setDownloadRequest(false)      
                // Crear un enlace, agregarlo a doc y simular un clic para descargar el archivo
                const url = window.URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Reporte guardia ${shift.id} - ${Date.now()}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                renderAlert("Reporte generado!", "Exito", "success",4000)   
            })
            .catch((error) => {
                console.log ("***********>>> "+error)    
                setDownloadRequest(false) 
                renderAlert(`Error inesperado: ${error}`, "Error", "error",4000)   
            }
        )
    }
    function renderButtonDownloadShiftReport(){
        return(
            <span onClick={downloadShiftReport} className="btn btn-outline-success ">
                <p>Descargar resumen</p>
                {downloadRequest? (
                    <div className="buttonRequestContainer">
                        {renderPendingPostRequest()}
                    </div>
                ) : <DownloadIcon  sx={{ fontSize: 40 }} /> }                                     
            </span>    
        )
    }    
    function renderShift (){
        if(shift !== null ){
            const fecha = new Date(shift?.date)
            return(
                <div className="actualShift">
                    <div className="header">
                        <h5 className="">Datos de la guardia {shift.dam}</h5>      
                        <div>
                            <span>
                                <ul>
                                    <li> ID: {shift.id}</li>
                                    <li> Fecha: {fecha.toLocaleDateString()}</li>
                                    <li> Estado: {shift.close === null && "Activo"}</li>
                                </ul>    
                            </span>     
                        </div>
                        <span className="notes">                            
                            <p> Notas: {shift.notes}</p>
                        </span>                                       
                    </div>          
                    <RecordsContainer records={shift.records}/>
                    <StaffContainer/>
                    
                    {shift.close === null && (
                        <div className="buttons">    
                            {renderButtonDownloadShiftReport()}             
                            <SendReportModal/>        
                            <span onClick={downloadShiftReport} className="btn btn-outline-success funcionalidadPendiente">
                                <p>Editar guardia</p>
                                <DownloadIcon  sx={{ fontSize: 40 }} />                      
                            </span>                
                            <span onClick={downloadShiftReport} className="btn btn-outline-success funcionalidadPendiente">
                                <p>Btn AGREGAR OTRAS COSAS, COMBUSTIBLE, CAMINONETAS EMBAR, ECTS </p>
                                <DownloadIcon  sx={{ fontSize: 40 }} />                      
                            </span>    
                            <CloseShiftModal />          
                        </div>
                    )}
                    
                </div>
            )
        } else{
            return(
                <div className="actualShift">
                    <div className="header">
                        <h5 className="">No hay guardia cargada para el usuario</h5>                 
                    </div>      
                    {renderFormCreateShift()}
                </div>
            )
        }
    }
    function sendForm(data){
        data.staff=[loguedUser.dni]
        createShift(data)
    }
    function createShift(data){
        setSendingPostRequest(true)
        request(
            "POST",
            `/shifts/`,
            data )
            .then((response) => {                  
                setSendingPostRequest(false)
                if(response.status == 201){    
                    setShift(response.data)
                    renderAlert("Guardia creada!", "Exito", "success",4000)   
                }
            })
            .catch((error) => {   
                setShift(null)
                renderAlert(error.response?.data?.message, "Error", "warning",5000)
                setSendingPostRequest(false)
            }
        )  
    }
    function renderFormCreateShift(){
        return(
            <form onSubmit={handleSubmit(sendForm)} >  
                <h6>¿Quieres crear una nueva guardia? </h6>
                <div className="form-outline mb-4 inputDiv">
                    <label  htmlFor="dam">Elije el dique</label>
                    <select id="dam" name="dam" className="form-select" {...register("dam")}>
                        <option value="DIQUE_ULLUM">Ullum</option>
                        <option value="DIQUE_PUNTA_NEGRA">Punta negra </option>
                        <option value="DIQUE_CUESTA_DEL_VIENTO">Cuesta del viento</option>    
                    </select>
                </div>            
                <div className="form-outline mb-4 inputDiv">
                    <label className="form-label" htmlFor="notes">Notas</label>
                    <input type="text" id="notes" name="notes" className="form-control" {...register("notes")} />
                    {errors.notes?.type === "required" && <p className="inputFormError">El campo es requerido</p>}
                </div>                         
                <button type="submit" className="btn btn-success btn-lg btn-block mb-3">Crear guardia!</button>
            </form>           
        )
    }
    return (      
        <>                
        { alert && displayAlert(alert)}
        { sendingPostRequest && renderPendingPostRequest()}
        { loadingShift?  renderSpiner() : renderShift()}
        </>
    )
}

