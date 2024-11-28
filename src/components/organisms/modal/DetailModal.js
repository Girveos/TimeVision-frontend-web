// components/Modals/index.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './DetailModal.css';
import { Button } from 'antd';

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
      <Box className="modal-box-request">
        {data && renderContent(data)}
        {data && showActions && (
          <div className="modal-buttons">
            <Button className="accept-btn" onClick={() => onAccept(data._id)}>
              Aceptar
            </Button>
            <Button className="reject-btn" onClick={() => onReject(data._id)}>
              Rechazar
            </Button>
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
