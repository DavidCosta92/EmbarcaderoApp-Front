// @ts-nocheck
import AdminDashboard from "./admin/adminDashboard"
import "./dashboard.css"
import LifeguardDashboard from "./lifeguard/lifeguardDashboard"
import OfficeDashboard from "./office/officeDashboard"

export default function Dashboard ({user}){
    return(
        <div className="container-fluid ">
            { user.role === "LIFEGUARD" && <LifeguardDashboard user={user}/> }
            { user.role === "OFFICE" && <OfficeDashboard user={user}/> }
            { user.role === "ADMIN" && <AdminDashboard user={user}/> }
        </div>
    )
}