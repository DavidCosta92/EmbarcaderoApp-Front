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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

export default function DialogDeleteStaff({shiftId, member}) {
    const { renderAlert } = React.useContext(AlertContext)  
    const { renderPendingPostRequest, setShiftHasUpdates} = useContext(AuthContext)
  const [open, setOpen] = useState(false);

  const [ sendingPostRequest , setSendingPostRequest] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  
  function deleteStaff(){        
    setSendingPostRequest(true)
    request(
        "PUT",
        `shifts/${shiftId}/staff/${member.id}`,
        {}).then(
        (response) => {                
            renderAlert("Usuario Eliminado!", "Exito", "info",4000)   
            setSendingPostRequest(false)
            setShiftHasUpdates(true)
            handleClose()
        })
        .catch((error) => {    
            setSendingPostRequest(false)
            if(error.response){
                console.log(error.response)
                renderAlert(`Error ${error.response?.status}: ${error.response?.data?.message}`, "Error", "error",5000)  
            }
        }
    ) 
}

  return (
    <React.Fragment>
        
        <DeleteForeverIcon color="error" onClick={handleClickOpen} />
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <p>¿Eliminar a <b>{member.firstName} {member.lastName}</b> de la guardia?</p>
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                
                {sendingPostRequest && renderPendingPostRequest()}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined"  onClick={handleClose}>No!</Button>
            <Button variant="contained" color="error" onClick={deleteStaff} autoFocus>
                ¡Eliminar!
            </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}