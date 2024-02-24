// @ts-nocheck
import "./Buttons.css"

export default function Buttons(props){
    return (
        <div className="row">
            <div className="col-md-12 text-center btnsAuth">                
                <button className="btn btn-primary" onClick={props.login}> Login </button>
                <button className="btn btn-dark" onClick={props.logout}> Logout </button>
            </div>
        </div>
    )
}