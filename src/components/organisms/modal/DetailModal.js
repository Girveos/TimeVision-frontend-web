// components/Modals/index.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './DetailModal.css';

export const DetailModal = ({ 
  open, 
  onClose, 
  data, 
  onAccept, 
  onReject,
  showActions = true,
  renderContent 
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        {data && renderContent(data)}
      </Box>
    </Modal>
  );
};

export const Modaldetail = ({ 
  open, 
  onClose, 
  data, 
  onAccept, 
  onReject,
  showActions = true,
  renderContent 
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        {/* Solo renderiza el contenido si data existe */}
        {data && renderContent(data)}
        {data && showActions && (
          <div className="modal-buttons">
            <button className="accept-btn" onClick={() => onAccept(data.id)}>
              Aceptar
            </button>
            <button className="reject-btn" onClick={() => onReject(data.id)}>
              Rechazar
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );
};


export const ImageModal = ({ open, onClose, imageUrl }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-image-box">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Imagen Ampliada"
            className="full-size-image"
            onClick={onClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export const Modals = {
  Modaldetail,
  DetailModal,
  ImageModal
};

export default Modals;