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
import { useState, useContext } from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonFormRegister from "../../forms/person/personFormRegister";

export default function PersonFormModal ({personSelected , renderAlert}){
  
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
          {personSelected ?  "Editar" : "Agregar"}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose} >
          <DialogTitle>Ingresa el dni de la persona</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Si los datos no son correctos debes actualizarlos!
            </DialogContentText>            
            <PersonFormRegister personSelected={personSelected} renderAlert={renderAlert}  handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}