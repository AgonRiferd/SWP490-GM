import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = ({children}) => {
  return (
    <NavLink end to="/" className='logo'>
      {children}
      <img src="/logo1.png" alt='logo1' className='title'/>
    </NavLink>
  );
};

export default Logo;