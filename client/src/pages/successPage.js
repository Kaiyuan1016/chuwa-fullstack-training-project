import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message.message;
  console.log(message);
  const onClose = () => {
    navigate('/signin');
  }
  return (
    <Modal
      title="Success"
      open='true'
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default SuccessPage;
