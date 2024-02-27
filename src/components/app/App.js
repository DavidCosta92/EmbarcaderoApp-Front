// @ts-nocheck
import './App.css'
import Footer from '../footer/footer'
import AuthProvider from '../utils/authContext'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import AddRecord from '../records/addRecord/addRecord'
import AuthContent from '../authContent/authContent'
import RecordDetails from '../records/recordDetails/recordDetails'
import WelcomeContent from '../welcomeContent/WelcomeContent'
import Navbar from '../navbar/navbar'
import foto_user from "../../assets/pictures/profile/foto_user.jpg"
import AuthForm from '../forms/authForm/authForm'


const loguedUserMock ={
    username: "david hard",
    profilePicture: foto_user
}

export default function App (){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Navbar/> 
                <Routes>
                    <Route path='/' element={ <WelcomeContent/>} />
                    <Route path='/addNewRecord' element={<AddRecord/>} />
                    <Route path='/dashboard' element={<AuthContent/>} />
                    <Route path='/recordDetails/:id' element={<RecordDetails/>}/>    

                    <Route path='/licenses' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}     
                    <Route path='/persons' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}   

                    <Route path='/login' element={<AuthForm/>} />
                    <Route path='/userProfile' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}   

                    
                    
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