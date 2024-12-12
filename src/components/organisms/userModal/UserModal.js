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
          <h2>{user.name}</h2>
        </div>

        <div className="modal-body">
          <div className="info-row">
            <span className="label">Cargo:</span>
            <span className="value">{user.position}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="label">Teléfono:</span>
            <span className="value">{user.telephone}</span>
          </div>
          <div className="info-row">
            <span className="label">Documento:</span>
            <span className="value">{user.type_doc} {user.num_doc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal; 