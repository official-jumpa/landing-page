import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingSupportButton.css';
import messageIcon from '../../assets/icons/actions/message.svg';

const FloatingSupportButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="fab-support"
      aria-label="Open chat"
      type="button"
      onClick={() => navigate('/chat')}
    >
      <img src={messageIcon} alt="" width="24" height="24" />
    </button>
  );
};

export default FloatingSupportButton;
