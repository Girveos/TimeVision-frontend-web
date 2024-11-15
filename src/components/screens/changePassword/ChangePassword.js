import { Input, Button } from "antd";
import "./ChangePassword.css";

const ChangePassword = () => {
  return (
    <div className="ChangePasswordScreen">
      <div className="LoginCard">
        <div className="LoginContent">
          <h1>¡Restablecer contraseña!</h1>
          <h2>Ingrese su correo electrónico para restablecer la contraseña</h2>
        </div>
        <div className="LoginInputs">
          <h3>Correo empresarial:</h3>
          <Input placeholder="" className="InputMail" />
        </div>
        <div className="buttonContainer">
          <div className="LoginButton">
            <Button type="primary" className="CancelButton">
              Cancelar
            </Button>
          </div>
          <div className="LoginButton">
            <Button type="primary" className="LoginButton">
              Recuperar
            </Button>
          </div>
        </div>
      </div>
      <div className="LoginBackground" />
    </div>
  );
}

export default ChangePassword;