import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
export const AuthContext = createContext();

export const AuthStore = ({ children }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const user = auth.currentUser;
    const initialToken = localStorage.getItem('token');
    console.log(user);
    console.log(initialToken);
    const registerNewAccount = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(auth.currentUser)
            console.log(response);
        } catch (error) {
            setError(error.message)
        }
    };

    const login = async (email, password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const token = user._tokenResponse.idToken;
            console.log(token);
            localStorage.setItem('token', token);
            setIsLogged(true)
            validUserAccount();
        } catch (error) {
            setError(error.message)
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            validUserAccount();
            console.log('successful logout');

        } catch (error) {
            setError(error.message);
        }

    };

    const validUserAccount = () => {
        // onAuthStateChanged(auth, (user) => {
        //     console.log('im in param');
        //     if (initialToken) {
        //         // if (user.emailVerified) {
        //         //     setIsLogged(true);
        //         // } else {
        //         //     setIsLogged(false)
        //         //     setError('Unverified email address')
        //         // }
        //         setIsLogged(true);
        //     } else {
        //         setIsLogged(false);
        //     };
        // });
    };

    const updateUserPassword = async (newPassword) => {
        try {
            await updatePassword(user, newPassword)
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }
    }

    console.log(error);

    const store = {
        authentication: {
            registerNewAccount,
            login,
            logout,
            updateUserPassword,
        },
        user: {
            isLogged,
        },
        notifications: {
            error,
            success,
            setSuccess,
        }
    };

    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    );
}

