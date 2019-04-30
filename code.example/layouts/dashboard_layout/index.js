import React from "react";
import Header from "../../components/dashboard_header";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
