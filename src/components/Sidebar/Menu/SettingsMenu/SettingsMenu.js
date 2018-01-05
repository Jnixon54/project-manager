import React, { Component } from 'react';

import KellySetting from './KellySetting'
import './SettingsMenu.css';

const SettingsMenu = () => {
  return (
    <div className="settings-menu">
      <KellySetting />
    </div>
  );
}

export default SettingsMenu