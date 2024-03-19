// @ts-nocheck
import React, { useState } from "react";
import AddStaffForm from "../addStaffForm/addStaffForm";
import "./addStaffModal.css"
import { Button, Dialog, DialogTitle, DialogActions,DialogContent,DialogContentText  } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddStaffModal({}){
  
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
          <AddCircleIcon color="success" onClick={handleClickOpen} id="btnAddStaff"/>
        <Dialog
          open={open}
          onClose={handleClose} >
          <DialogTitle>Ingresa el dni del usuario a agregar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Recuerda que debe ser guardavida para poder agregarlo!
            </DialogContentText>            
            <AddStaffForm handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}