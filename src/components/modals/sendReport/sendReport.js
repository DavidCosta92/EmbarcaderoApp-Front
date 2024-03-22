// @ts-nocheck
import "./sendReport.css"
// @ts-nocheck
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { request } from '../../utils/axios_helper';
import { AlertContext } from '../../utils/alertContex';
import { AuthContext } from '../../utils/authContext';
import { useContext } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useForm } from "react-hook-form";


export default function SendReportModal(){
    const {register, formState:{errors}, handleSubmit, watch, reset } = useForm()   

    const { renderAlert } = useContext(AlertContext)  
    const { renderPendingPostRequest, shift} = useContext(AuthContext)

    const [open, setOpen] = useState(false);

    const [ sendingPostRequest , setSendingPostRequest] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function sendEmail(data){
        setSendingPostRequest(true)
        console.log("Enviando email a... " + data.email + shift.id)        
        request(
            "GET",
            `shifts/shiftResume/${shift.id}/${data.email}`,
            {})
            .then((response) => {      
              setSendingPostRequest(false)
              if(response.status ===202){
                renderAlert(`Email enviado a ${data.email}` , "Exito", "success",4000)   
                reset()
                handleClose()                 
              }
            })
            .catch(
            (error) => {
                setSendingPostRequest(false)
                if(error.response){                
                  renderAlert(`${error.response.status}: ${error.response.data.message} - Cod: ${error.response.data.internalCode}`, "Error", "warning",10000)
                } else {
                  renderAlert(`Error inesperado ${error}`, "Error", "warning",10000)
                }
            }
        )      
    }
    return(
        <React.Fragment>
            <span className="btn btn-outline-success" onClick={handleClickOpen} >
                <p>Compartir resumen</p>
                <SendIcon color="success" />                   
            </span>             

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <p>Coloca el email para enviar reporte de la guardia</p>   
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">         
                        <form onSubmit={handleSubmit(sendEmail)} className="formSendEmail">
                            <div className="form-outline mb-4">
                                <input type="email" id="email" name="email" className="form-control" {...register("email", {required:true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
                                {errors.email?.type === "required" && <p className="inputFormError">El campo es <b>requerido</b></p>}
                                {errors.email?.type === "pattern" && <p className="inputFormError">Formato esperado: <b>tuEmail@cuenta.com</b></p>}
                            </div>
                            <Button variant="contained" color="success" type="submit" >
                                Enviar reporte!
                            </Button>
                        </form>
                        
                        {sendingPostRequest && renderPendingPostRequest()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
      );
}