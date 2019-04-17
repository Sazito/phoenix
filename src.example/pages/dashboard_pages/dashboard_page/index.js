import React from 'react';
import Logo from '../../../components/logo';
import { pDashboard } from "./dashboard.scss"

const DashboardPage = () => {
  return(
    <div className={pDashboard}>
      <Logo />
      <div>Dashboard</div>
    </div>
  )
};

export default DashboardPage;