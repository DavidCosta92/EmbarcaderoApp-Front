// @ts-nocheck
import "./customAlert.css"
import { Alert } from "@mui/material";
import AlertTitle from '@mui/material/AlertTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CustomAlert({alertConfig}){

    const setIcon = () =>{
        if(alertConfig.style == "success"){
            return (
                <CheckCircleOutlineIcon fontSize="inherit" />
            )
    
        } else if(alertConfig.style == "info"){
            return (
                <ArrowForwardIcon fontSize="inherit" />
            )
    
        }else if(alertConfig.style == "warning"){
            return (
                <WarningAmberIcon fontSize="inherit" />
            )
    
        }else if(alertConfig.style == "error"){
            return (
                <ErrorOutlineIcon fontSize="inherit" />
            )
    
        }
    }

    return (
        <div className="alertContainer">
            <Alert icon={setIcon()}  severity={alertConfig.style}>
                <AlertTitle>{alertConfig.title}</AlertTitle>
                {alertConfig.msg}
            </Alert>
        </div>  
    )
}