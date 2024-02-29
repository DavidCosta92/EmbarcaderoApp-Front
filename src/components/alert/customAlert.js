// @ts-nocheck
import "./customAlert.css"
import { Alert } from "@mui/material";
import AlertTitle from '@mui/material/AlertTitle';
import { Checklist } from "@mui/icons-material";

export default function CustomAlert({alertConfig}){
    return (
        <div className="alertContainer">
            <Alert icon={<Checklist fontSize="inherit" />} severity={alertConfig.style}>
                <AlertTitle>{alertConfig.title}</AlertTitle>
                {alertConfig.msg}
            </Alert>
        </div>  

    )
}