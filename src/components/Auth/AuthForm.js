import { useState, useContext } from 'react';
import axios from 'axios';
import classes from './AuthForm.module.css';
import { AuthContext } from '../../store/auth-context';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const confirmAccount = (user) => {
    console.log(user);
    const x = getAuth();
    console.log(x);

  }

  const authHandler = async (event) => {
    event.preventDefault();
    const request = isLogin ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
    try {
      const response = await request(auth, email, password);
      const user = response.user;
      if (request == createUserWithEmailAndPassword) {
        console.log('Im here');
        await sendEmailVerification(auth.currentUser);
      } else {
        console.log('success login');
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={authHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={(el) => setEmail(el.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required onChange={(el) => setPassword(el.target.value)} minLength='7' />
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
