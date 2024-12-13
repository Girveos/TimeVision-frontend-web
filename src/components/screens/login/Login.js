import React, { useState } from "react";
import { Input, Button, message } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/loginSchema";
import { login } from "../../../config/routes";
import {
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleForgotPassword = () => {};

  const onSubmit = handleSubmit(async (data) => {
  try {
    await login(data.user, data.password); 

    const token = localStorage.getItem("token"); 

    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicia sesión de nuevo.");
    }

    const payload = jwtDecode(token); 

    if (payload.rol.toLowerCase() === "jefe") {
      onLoginSuccess();
      navigate("/home");
    } else {
      message.error("No tienes permisos para acceder");
      localStorage.removeItem("token"); 
    }
  } catch (error) {
    console.error("Error durante el login:", error);
    message.error("Usuario o contraseña incorrectos");
  }
});


  return (
    <div className="LoginScreen">
      <div className="LoginCard">
        <div className="LoginContent">
          <h2>¡Bienvenido a TimeVision!</h2>
          <img src={require("../../../assets/LogoGrey.png")} alt="Logo" />
          <h3>Inicia sesión para acceder a TimeVision</h3>
        </div>
        <div className="input-login-container">
          <div>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  placeholder="Correo electrónico"
                  value={value}
                  onChange={onChange}
                  className="input-login"
                  name="email"
                />
              )}
              name="user"
            />
            {errors.user && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">{errors.user.message}</label>
              </div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={value}
                  onChange={onChange}
                  className="input-login"
                  name="password"
                  suffix={
                    showPassword ? (
                      <EyeOutlined onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                />
              )}
              name="password"
            />
            {errors.password && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">
                  {errors.password.message}
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="LoginPasswordRecover">
          <span>
            ¿Olvidaste tu contraseña?{" "}
            <a
              href="/"
              onClick={handleForgotPassword}
              style={{ color: "#8696BB", cursor: "pointer" }}
            >
              Haz clic aquí.
            </a>
          </span>
        </div>

        <div className="LoginButton">
          <Button type="primary" className="LoginButton" onClick={onSubmit}>
            Ingresar
          </Button>
        </div>
      </div>
      <div className="LoginBackground" />
    </div>
  );
}

export default Login;
