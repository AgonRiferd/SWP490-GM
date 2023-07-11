import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink end to="/" className='logo'>
      <img src="/logo.png" alt='logo'/>
    </NavLink>
  );
};

export default Logo;