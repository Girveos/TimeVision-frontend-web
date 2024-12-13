import React, { useState } from "react";
import "./ChangePasswordModal.css";
import { Button, Input, message } from "antd";
import {
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../../schemas/changePasswordSchema";
import { updatePassword } from "../../../config/routes";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updatePassword(
        data.currentPassword,
        data.newPassword
      );

      if (response.success) {
        reset();
        message.success("Contraseña cambiada con éxito.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        onClose();
      } else {       
        message.error("Error al cambiar la contraseña.");
      }
    } catch (error) {
      message.error(
        "Ocurrió un error inesperado. Por favor, intenta nuevamente."
      );
    }
  });

  const handleCancelButton = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Cambiar contraseña</h2>
        <div className="inputs-container">
          <div>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Contraseña actual"
                  className="input-field"
                  value={value}
                  onChange={onChange}
                  suffix={
                    showCurrentPassword ? (
                      <EyeOutlined
                        onClick={() => setShowCurrentPassword(false)}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() => setShowCurrentPassword(true)}
                      />
                    )
                  }
                />
              )}
              name="currentPassword"
            />
            {errors.currentPassword && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">
                  {errors.currentPassword.message}
                </label>
              </div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  className="input-field"
                  value={value}
                  onChange={onChange}
                  suffix={
                    showNewPassword ? (
                      <EyeOutlined onClick={() => setShowNewPassword(false)} />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() => setShowNewPassword(true)}
                      />
                    )
                  }
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">
                  {errors.newPassword.message}
                </label>
              </div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"password"}
                  placeholder="Confirmar contraseña"
                  className="input-field"
                  value={value}
                  onChange={onChange}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">
                  {errors.confirmPassword.message}
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="button-container">
          <Button className="save-btn" onClick={onSubmit}>
            Guardar
          </Button>
          <Button className="cancel-btn" onClick={handleCancelButton}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
