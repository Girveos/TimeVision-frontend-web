import React, { useState } from "react";
import { Input, Button, message } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
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

      const token = await localStorage.getItem("token");

      if (token) {
        onLoginSuccess();
        navigate("/home");
      } else {
        alert("No tienes permisos para acceder.");
        localStorage.removeItem("token");
      }
    } catch (error) {
      message.error("Ocurrió un error. Por favor, inicie sesión nuevamente.");
    }
  });

  return (
    <div className="LoginScreen">
      <div className="LoginCard">
        <div className="LoginContent">
          <h2>¡Bienvenido a TimeVision!</h2>
          <img src={require("../../../assets/LogoGrey.png")} alt="Logo" />
          <h4>Inicia sesión para acceder a TimeVision</h4>
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
