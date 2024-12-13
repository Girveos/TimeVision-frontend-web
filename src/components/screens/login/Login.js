import React, { useState } from "react";
import { Input, Button, message } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/loginSchema";
import { login, requestPasswordReset, verifyResetCode, resetPassword } from "../../../config/routes";
import {
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
} from "@ant-design/icons";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    try {
      switch (resetStep) {
        case 1:
          if (!resetEmail) {
            message.error("Por favor ingrese su correo electrónico");
            return;
          }
          
          const requestResponse = await requestPasswordReset(resetEmail);
          if (requestResponse.success) {
            message.success(requestResponse.message);
            setResetStep(2);
          } else {
            message.error(requestResponse.message);
          }
          break;

        case 2:
          if (!resetToken) {
            message.error("Por favor ingrese el código de verificación");
            return;
          }
          const verifyResponse = await verifyResetCode(resetEmail, resetToken);
          if (verifyResponse.success) {
            setResetStep(3);
          } else {
            message.error(verifyResponse.message);
          }
          break;

        case 3:
          if (!newPassword) {
            message.error("Por favor ingrese la nueva contraseña");
            return;
          }
          const resetResponse = await resetPassword(resetEmail, resetToken, newPassword);
          if (resetResponse.success) {
            message.success(resetResponse.message);
            setIsModalOpen(false);
            resetForm();
          } else {
            message.error(resetResponse.message);
          }
          break;
      }
    } catch (error) {
      message.error("Ocurrió un error. Por favor intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResetStep(1);
    setResetEmail("");
    setResetToken("");
    setNewPassword("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const renderModalContent = () => {
    switch (resetStep) {
      case 1:
        return (
          <>
            <p>Ingrese su correo electrónico para recuperar su contraseña</p>
            <div className="input-container">
              <MailOutlined className="input-icon" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <p>Ingrese el código de verificación enviado a su correo</p>
            <div className="input-container">
              <input
                type="text"
                placeholder="Código de verificación"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <p>Ingrese su nueva contraseña</p>
            <div className="input-container">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </>
        );
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.user, data.pass);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Token no encontrado. Por favor, inicia sesión de nuevo."
        );
      }

      const payload = jwtDecode(token);

      if (payload.rol.toLowerCase() === "jefe") {
        onLoginSuccess();
        navigate("/home");
      } else {
        message.error("No tienes permisos para acceder.");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      message.error(
        error.message ||
          "Ocurrió un error. Por favor, inicie sesión nuevamente."
      );
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
              name="pass"
            />
            {errors.pass && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">
                  {errors.pass.message}
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="LoginPasswordRecover">
          <span>
            ¿Olvidaste tu contraseña?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{ color: "#8696BB", cursor: "pointer" }}
            >
              Haz clic aquí.
            </a>
          </span>
        </div>

        <div className="LoginButton">
          <Button type="primary" className="LoginButton" onClick={handleSubmit(onSubmit)}>
            Ingresar
          </Button>
        </div>
      </div>
      <div className="LoginBackground" />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container-login">
          <div className="modal-close" />
            <div className="modal-header-login">
              <h2>Recuperar contraseña</h2>
            </div>
            
            <div className="modal-content">
              {renderModalContent()}
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                className="btn-submit"
                onClick={handleResetPassword}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
