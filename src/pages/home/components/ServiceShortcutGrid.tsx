import React, { useState } from 'react';
import dataIcon from '../../../assets/icons/services/data.svg';
import groupIcon from '../../../assets/icons/services/group.svg';
import airtimeIcon from '../../../assets/icons/services/airtime.svg';
import moreIcon from '../../../assets/icons/services/more.svg';
import predictionIcon from '../../../assets/icons/services/prediction.svg';
import billsIcon from '../../../assets/icons/services/bills.svg';

interface ServiceItem {
  label: string;
  icon: string;
  isMore?: boolean;
}

const homeServices: ServiceItem[] = [
  { label: 'Data', icon: dataIcon },
  { label: 'Group', icon: groupIcon },
  { label: 'Airtime', icon: airtimeIcon },
  { label: 'More', icon: moreIcon, isMore: true },
];

const allServices: ServiceItem[] = [
  { label: 'Data', icon: dataIcon },
  { label: 'Group', icon: groupIcon },
  { label: 'Airtime', icon: airtimeIcon },
  { label: 'Prediction', icon: predictionIcon },
  { label: 'Bills', icon: billsIcon },
];

interface ServiceShortcutGridProps {
  onWithdraw?: () => void;
  onDApp?: () => void;
}

const ServiceShortcutGrid: React.FC<ServiceShortcutGridProps> = ({ onWithdraw, onDApp }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="service-grid">
        {homeServices.map((s) => (
          <button
            key={s.label}
            className="service-item"
            onClick={s.isMore ? () => setShowAll(true) : undefined}
            type="button"
          >
            <img src={s.icon} alt="" className="service-icon" />
            <span className="service-label">{s.label}</span>
          </button>
        ))}
      </div>

      {showAll && (
        <div className="services-overlay" onClick={() => setShowAll(false)}>
          <div className="services-screen" onClick={(e) => e.stopPropagation()}>
            <div className="services-screen-header">
              <h3>All Services</h3>
              <button className="services-close" onClick={() => setShowAll(false)} type="button">✕</button>
            </div>
            <div className="services-screen-grid">
              {allServices.map((s) => (
                <button 
                  key={s.label} 
                  className="service-item" 
                  type="button"
                  onClick={s.label === 'DApp' ? onDApp : s.label === 'Withdraw' ? onWithdraw : undefined}
                >
                  <img src={s.icon} alt="" className="service-icon" />
                  <span className="service-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceShortcutGrid;
