// @ts-nocheck
import AdminDashboard from "./admin/adminDashboard"
import "./dashboard.css"
import LifeguardDashboard from "./lifeguard/lifeguardDashboard"
import OfficeDashboard from "./office/officeDashboard"

export default function Dashboard ({role}){
    return(
        <div className="container-fluid ">
            { role === "LIFEGUARD" && <LifeguardDashboard/> }
            { role === "OFFICE" && <OfficeDashboard /> }
            { role === "ADMIN" && <AdminDashboard /> }
        </div>
    )
}