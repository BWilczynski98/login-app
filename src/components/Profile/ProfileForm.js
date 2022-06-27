import React, { useState, useContext } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/auth-context';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const { authentication, notifications } = useContext(AuthContext);
  const { updateUserPassword } = authentication;
  const { success, setSuccess } = notifications;
  
  const submitHandler = (event) => {
    event.preventDefault();
    updateUserPassword(newPassword);
    setNewPassword('');
    setSuccess('Password changed!')
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>{success ? success : 'New password'}</label>
        <input
          type='password'
          id='new-password'
          value={newPassword}
          onChange={(el) => setNewPassword(el.target.value)}
          minLength='7'
        />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
