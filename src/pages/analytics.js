import React from 'react';
import SideNav from '../components/SideNav/SideNav';
import Analytics from '../components/Analtyics/Analytics';

const analytics = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <Analytics />
    </div>
  );
};

export default analytics;
