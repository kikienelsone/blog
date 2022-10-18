import Button from 'antd/lib/button';
import React from 'react';
import { Link } from 'react-router-dom';

import navBar from './NavBar.module.scss';

export const NavBar: React.FC = () => {
  return (
    <div className={navBar.wrapper}>
      <Link to="/">
        <p className={navBar.title}>Realworld Blog</p>
      </Link>

      <Link to="/signup">
        <Button className={navBar.button} type="dashed">
          Sign Up
        </Button>
      </Link>

      <Link to="/signin">
        <Button className={navBar.button}>Sign In</Button>
      </Link>
    </div>
  );
};
