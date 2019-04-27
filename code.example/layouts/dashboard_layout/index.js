import React from 'react';
import Header from '../../components/header';

const DashboardLayout = ({ children }) => {
  return (
    <>
    <div>
      <Header />
    </div>
    <div>
      {children}
    </div>
    </>
  )
};

export default DashboardLayout;