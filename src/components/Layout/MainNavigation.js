import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { AuthContext } from '../../store/auth-context';



const MainNavigation = () => {
  const { authentication, user } = useContext(AuthContext);
  const { logout } = authentication;
  const { isLogged } = user;


  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogged && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}

          {isLogged && (<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {isLogged && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
