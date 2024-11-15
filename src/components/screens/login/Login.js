import { Input, Button } from "antd";
import "./Login.css"

const Login = () => {

  const handleForgotPassword = () => {

  }

  return (
    <div className='LoginScreen'>
      <div className='LoginCard'>
        <div className='LoginContent'>
          <h1>¡Bienvenido a TimeVision!</h1>
          <img src={require("../../../assets/LogoGrey.png")} />
          <h2>Inicia sesión para acceder a TimeVision</h2>
        </div>
        <div className='LoginInputs'>
          <h3>Correo empresarial:</h3>
          <Input placeholder="" className="InputMail" />
          <h3>Contraseña:</h3>
          <Input placeholder="" className="InputPassword" />
        </div>
        <div className='LoginPasswordRecover'>
          <span>
            ¿Olvidaste tu contraseña? {" "}
            <a href="#" onClick={handleForgotPassword} style={{ color: '#8696BB', cursor: 'pointer' }}>
               Haz clic aquí
            </a>
          </span>
        </div>

        <div className='LoginButton'>
          <Button type="primary" className="LoginButton">Ingresa</Button>
        </div>
      </div>
      <div className='LoginBackground' />
    </div>
  )
}

export default Login;