// @ts-nocheck
import './App.css'
import logo from "../../logo.svg"
import Header from '../header/header'
import AppContent from '../appContent/appContent'
import Footer from '../footer/footer'
import AuthProvider from '../utils/authContext'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import AddRecord from '../records/addRecord/addRecord'
import AuthContent from '../authContent/authContent'
import RecordDetails from '../records/recordDetails/recordDetails'


export default function App (){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Header pageTitle="Embarcadero app" logoSrc={logo}/>
                <Routes>
                    <Route path='/' element={ <AppContent/>} />
                    <Route path='/addNewRecord' element={<AddRecord/>} />
                    <Route path='/dashboard' element={<AuthContent/>} />
                    <Route path='/recordDetails/:id' element={<RecordDetails/>}/>    

                    <Route path='/licenses' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}     
                    <Route path='/persons' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}   

                    

                      
                                                   

                    
                    {/*  
                    <Route path='/' element={} />
                    <Route path='/' element={} />
                    */}
                </Routes>
                <Footer/>
            </AuthProvider>   
        </BrowserRouter>
            
    )
}