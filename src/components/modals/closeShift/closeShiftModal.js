// @ts-nocheck
import * as React from 'react';
import { useContext, useState } from "react"
import "./closeShiftModal.css"
import { AlertContext } from "../../utils/alertContex"
import { AuthContext } from "../../utils/authContext"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { request } from '../../utils/axios_helper';

export default function CloseShiftModal(){
    const { alert, renderAlert, displayAlert } = useContext(AlertContext)
    const { loguedUser,renderPendingPostRequest, getShiftUser, renderSpiner, shift, setShift, loadingShift, setLoadingShift, setShiftHasUpdates} = useContext(AuthContext)

    let activeRecords = 0
    shift?.records?.map(rec=>{
        if(rec.recordState == "ACTIVO"){
            activeRecords +=1
        }
    })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const [ closeShiftRequest , setCloseShiftRequest] = useState(false)
    
    function closeShift(){
        setCloseShiftRequest(true)  
        request(
            "PUT",
            `shifts/${shift.id}`,
            {"close" : true})
            .then((response) => {   
                console.log(response.data)            
                let shiftUpd = shift
                shiftUpd.close = true              

                setShift(shiftUpd)   
                setShiftHasUpdates(true)
                setCloseShiftRequest(false) 

                handleClose()  
                renderAlert("Cierre generado exitosamente", "Exito", "success",4000)   
            })
            .catch((error) => {
                console.log (error)   
                renderAlert(`Cod: ${error.response?.status}: ${error.response?.data?.message}`, "Error", "error",4000) 
                setCloseShiftRequest(false)  
            }
        )
    }
    return(
        <React.Fragment>
            {activeRecords>0 ? (        
                <button  className="btn btn-outline-danger" onClick={handleClickOpen} disabled >                
                    <p>Registros activos, no puedes cerrar la guardia</p> <CancelIcon  sx={{ fontSize: 40 }} />
                </button> 
            ) : (         
                <button  className="btn btn-outline-danger" onClick={handleClickOpen} >                
                     <p>Cerrar guardia</p> <CancelIcon  sx={{ fontSize: 40 }} />
                </button>                  
            )}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿Deseas cerrar la guardia?"}
            </DialogTitle>
            <div className="buttonRequestContainer">
              {closeShiftRequest? (
                    <>
                    {renderPendingPostRequest()}
                    </>
            ) : (
                <>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={closeShift} autoFocus>¡SI!</Button>
                </>                
            )}
            </div>
          </Dialog>
        </React.Fragment>
        
    )

}