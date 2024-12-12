import React from 'react';
import './UserModal.css';

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <div className="modal-avatar">
            {user.photo ? (
              <img src={user.photo} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="header-info">
            <h2>{user.name}</h2>
            <p className="position">{user.position}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <h3>Información Personal</h3>
            <div className="info-row">
              <span className="label">Nombre:</span>
              <span className="value">{user.firstname}</span>
            </div>
            <div className="info-row">
              <span className="label">Apellido:</span>
              <span className="value">{user.lastname}</span>
            </div>
            <div className="info-row">
              <span className="label">Tipo Doc:</span>
              <span className="value">{user.type_doc}</span>
            </div>
            <div className="info-row">
              <span className="label">Número Doc:</span>
              <span className="value">{user.num_doc}</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Información de Contacto</h3>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Teléfono:</span>
              <span className="value">{user.telephone}</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Información Laboral</h3>
            <div className="info-row">
              <span className="label">Cargo:</span>
              <span className="value">{user.position}</span>
            </div>
            <div className="info-row">
              <span className="label">Estado:</span>
              <span className="value">
                {user.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal; 