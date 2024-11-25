import React, { useState } from 'react';
import { Input, Button } from "antd";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { login } from '../../../config/routes';
import { jwtDecode } from 'jwt-decode';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForgotPassword = () => {
   
  };

  const onClick = async () => {
    try {
      await login(email, password);  
      const token = await localStorage.getItem("token");

      if (token) {
        onLoginSuccess();
        navigate("/home");
      } else {
        alert("No tienes permisos para acceder.");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log("AQUI ESTA EL ERROR", error)
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className='LoginScreen'>
      <div className='LoginCard'>
        <div className='LoginContent'>
          <h1>¡Bienvenido a TimeVision!</h1>
          <img src={require("../../../assets/LogoGrey.png")} alt="Logo" />
          <h2>Inicia sesión para acceder a TimeVision</h2>
        </div>
        <div className='LoginInputs'>
          <h3>Correo empresarial:</h3>
          <Input 
            placeholder="" 
            className="InputMail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <h3>Contraseña:</h3>
          <Input 
            type="password" 
            placeholder="" 
            className="InputPassword" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className='LoginPasswordRecover'>
          <span>
            ¿Olvidaste tu contraseña? {" "}
            <a href="/" onClick={handleForgotPassword} style={{ color: '#8696BB', cursor: 'pointer' }}>
               Haz clic aquí
            </a>
          </span>
        </div>

        <div className='LoginButton'>
          <Button type="primary" className="LoginButton" onClick={onClick}>Ingresa</Button>
        </div>
      </div>
      <div className='LoginBackground' />
    </div>
  )
}

export default Login;
