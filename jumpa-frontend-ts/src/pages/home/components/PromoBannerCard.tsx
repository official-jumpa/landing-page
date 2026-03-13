import React from 'react';
import promoImg from '../../../assets/images/banners/promo-invite-users.svg';

const PromoBannerCard: React.FC = () => {
  return (
    <div className="banner-card">
      <img src={promoImg} alt="Enjoy amazing benefit when you invite new users" className="banner-img" />
    </div>
  );
};

export default PromoBannerCard;
