import { useState, useContext } from 'react';
import classes from './AuthForm.module.css';
import { AuthContext } from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authentication, notifications } = useContext(AuthContext);
  const { registerNewAccount, login } = authentication;
  const { error } = notifications;
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    clearInput();
  };

  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  const submitHandler = (event) => {
    event.preventDefault();
    isLogin ? login(email, password) : registerNewAccount(email, password);
    clearInput();
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <p className={classes.notifications}>{error}</p>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(el) => setEmail(el.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(el) => setPassword(el.target.value)}
            minLength='7'
            required
          />
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
