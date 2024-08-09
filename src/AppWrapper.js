// src/AppWrapper.js
import React from 'react';
import { NotificationProvider } from './Notification';

const AppWrapper = ({ children }) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

export default AppWrapper;
