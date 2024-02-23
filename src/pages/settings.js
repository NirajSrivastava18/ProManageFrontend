import React from 'react';
import SideNav from '../components/SideNav/SideNav';
import Settings from '../components/SettingsComponent/settingsComponent';

const setttings = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <Settings />
    </div>
  );
};

export default setttings;
