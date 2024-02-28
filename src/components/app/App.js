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
import ProtectedRoute from '../utils/protectedRoute'
import { user_role } from '../utils/userRoles'


export default function App (){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Navbar/> 
                <Routes>

                    {/* RUTAS PUBLICAS */}
                    <Route path='/' element={ <WelcomeContent/>} />
                    <Route path='/auth' element={<AuthForm/>} />

                    {/* RUTAS AUTHENTICADOS */}
                    <Route element={<ProtectedRoute />}> 
                        <Route path='/dashboard' element={<AuthContent/>} />
                        <Route path='/licenses' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}     
                        <Route path='/persons' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}   
                        <Route path='/userProfile' element={<AuthContent/>} /> {/* >>>>> PENDIENTE <<<<< */}   
                    </Route>

                    {/* RUTAS AUTHENTICADOS && ROLES NAUTICOS  o ADMIN */}
                    <Route element={<ProtectedRoute onlyRoles={[user_role.lifeguard,user_role.admin]} />}> 
                        <Route path='/addNewRecord' element={<AddRecord/>} />
                        <Route path='/recordDetails/:id' element={<RecordDetails/>}/>    
                    </Route>

                    {/* RUTAS AUTHENTICADOS && ROL OFICINA o ADMIN */}
                    <Route element={<ProtectedRoute onlyRoles={[user_role.office,user_role.admin]} />}> 
                        {/*  
                        <Route path='/licences/add' element={<AddRecord/>} />
                        <Route path='/recordDetails/:id' element={<RecordDetails/>}/>    
                        */}
                    </Route>

                </Routes>
                <Footer/>
            </AuthProvider>   
        </BrowserRouter>
            
    )
}