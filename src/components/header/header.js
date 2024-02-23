// @ts-nocheck
import "./header.css"

export default function Header (props){
    return ( 
        <header className="d-flex flex-column justify-content-center align-items-center App-header">
            <img src={props.logoSrc} className="App-logo" alt="logo"/>
            { /* <h1>{props.pageTitle}</h1> */}
        </header>
    )
}