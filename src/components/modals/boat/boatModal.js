// @ts-nocheck
import "./boatModal.css"
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
import SailingIcon from '@mui/icons-material/Sailing';
import BoatForm from "../../forms/boat/boatForm";

export default function BoatModal({boatSelected, setBoatSelected, renderAlert }){
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
          {boatSelected? "Editar" : "Agregar" }
        </Button>
        <Dialog
          open={open}
          onClose={handleClose} >
          <DialogTitle>Embarcacion tiene matricula?</DialogTitle>
          <DialogContent>
            <DialogContentText>
             SI tiene, entonces, poner matricula de embarcacion... si no tiene, agregar TIPO EMB, DETALLES
            </DialogContentText>            
            <BoatForm handleClose={handleClose} boatSelected={boatSelected} setBoatSelected={setBoatSelected} renderAlert={renderAlert} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }