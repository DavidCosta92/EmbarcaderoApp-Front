// @ts-nocheck
import * as React from 'react'
import "./WelcomeContent.css"
import AuthForm from '../forms/authForm/authForm'

export default function WelcomeContent (){
    
    return (
        <div className="welcomeContent">
            <div className='container container-lg alert alert-dark'>
                <h1 className='text-center mb-2'>Bienvenido a EMBARCADERO APP</h1>
                <h4 className='text-center mb-4'> (Nombre aun en discusion.. )</h4>
                <p>Sistema para gestionar las embarcaciones, las guardias y los equipos de rescate en cada dique de la provincia, permite mantener
                    un registro de las embarcaciones que acceden, el personal afectado y otros datos vitales, para estadistica y analisis. </p>
                <p>El proyecto esta en una etapa temprana de desarrollo. En esta etapa, ya se realizo el relevamiento, analisis y diseño de la solucion. Ademas se inicio la primera codificacion de la API, usando tecnologias como: Java, Spring, MySQL, Swagger, Spring security, JWT, Mockito, Email sender, etc.</p> 
                <p>En cuanto al Frontend sera realizado en React JS, pero como veras, esta en una aun en un estadio inicial.. </p>
            </div>
            <AuthForm/>
            
        </div>
    )
}