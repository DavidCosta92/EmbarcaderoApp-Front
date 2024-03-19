// @ts-nocheck
import "./boatFormModal.css"
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
import SailingIcon from '@mui/icons-material/Sailing';
import BoatForm from "../../forms/boat/boatForm";

export default function BoatFormModal ({boatSelected, renderAlert}){
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
          <SailingIcon/>
          {boatSelected ?  "Editar" : "Agregar"}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose} >
          <DialogTitle>Embarcacion tiene matricula?</DialogTitle>
          <DialogContent>
            <DialogContentText>
             SI tiene, entonces, poner matricula de embarcacion... si no tiene, agregar TIPO EMB, DETALLES
            </DialogContentText>            
            <BoatForm renderAlert={renderAlert}  handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }