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


export default function PersonModal({setPersonSelected , renderAlert}){
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
          Persona a cargo
        </Button>
        <Dialog
          open={open}
          onClose={handleClose} >
          <DialogTitle>Ingresa el dni de la person a cargo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Si los datos no son correctos puedes actualizarlos!
            </DialogContentText>

            { /* <TextField autoFocus required margin="dense" id="dni" name="dni" label="Dni persona a cargo" type="number" fullWidth variant="standard"/> */}
            
            <PersonForm handleClose={handleClose} setPersonSelected={setPersonSelected} renderAlert={renderAlert} />


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }