// @ts-nocheck
import './App.css'
import logo from "../../logo.svg"
import Header from '../header/header'
import AppContent from '../appContent/appContent'
import Footer from '../footer/footer'
import AuthProvider from '../utils/authContext'


export default function App (){
    return(
        <AuthProvider>
            <Header pageTitle="Embarcadero app" logoSrc={logo}/>
            <AppContent/>
            <Footer/>
        </AuthProvider>   
            
    )
}