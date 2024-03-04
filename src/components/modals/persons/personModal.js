// @ts-nocheck
import "./personModal.css"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RegisterForm from "../../forms/register/registerForm";
import PersonForm from "../../forms/person/personForm";
import { useState, useContext } from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


export default function PersonModal({ person,setPerson, setFormData, setUpdatedForm,formData, renderAlert}){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          <PersonAddAlt1Icon/>
          'personSelected? "Editar" : "Agregar" '
        </Button>
        <Dialog
          open={open}
          onClose={handleClose} >
          <DialogTitle>Ingresa el dni de la persona a cargo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Si los datos no son correctos debes actualizarlos!
            </DialogContentText>            
            <PersonForm person={person} setPerson={setPerson} handleClose={handleClose} setFormData={setFormData} setUpdatedForm={setUpdatedForm} formData={formData}  renderAlert={renderAlert} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }