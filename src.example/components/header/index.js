import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return(
    <>
      <Link to={'/dashboard/settings'}>Settings</Link> |
      <Link to={'/dashboard/profile'}>Profile</Link>
    </>
  )
};

export default Header;