import React from 'react';
import './FloatingSupportButton.css';
import messageIcon from '../../assets/icons/actions/message.svg';

const FloatingSupportButton: React.FC = () => {
  return (
    <button className="fab-support" aria-label="Support" type="button">
      <img src={messageIcon} alt="" width="24" height="24" />
    </button>
  );
};

export default FloatingSupportButton;
