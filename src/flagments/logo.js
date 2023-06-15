import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const logoClassName = `fa-solid fa-dumbbell ${isHovered ? 'fa-bounce' : ''}`;

  return (
    <NavLink end to="/" className='logo' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2>G&nbsp;</h2>
      <i className={logoClassName}></i>
      <h2>&nbsp;M</h2>
    </NavLink>
  );
};

export default Logo;