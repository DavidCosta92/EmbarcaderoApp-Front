// @ts-nocheck
import "./Buttons.css"

export default function Buttons(props){
    return (
        <div className="row">
            <div className="col-md-12 text-center" style={{marginTop: "30px", marginBottom: "30px"}}>
                
                <button className="btn btn-primary" style={{marginTop: "10px"}} onClick={props.login}> Login </button>
                <button className="btn btn-dark" style={{marginTop: "10px"}} onClick={props.logout}> Logout </button>
            </div>
        </div>
    )
}