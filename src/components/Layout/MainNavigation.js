import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { AuthContext } from '../../store/auth-context';

const MainNavigation = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
