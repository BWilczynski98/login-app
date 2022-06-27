import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
export const AuthContext = createContext();

export const AuthStore = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLogged, setIsLogged] = useState(false);


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
            await signInWithEmailAndPassword(auth, email, password);
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
        onAuthStateChanged(auth, (user) => {
            console.log('im in param');
            if (user) {
                if (user.emailVerified) {
                    setIsLogged(true);
                } else {
                    setIsLogged(false)
                    setError('Unverified email address')
                }
            } else {
                setIsLogged(false);
            };
        });
    };

    console.log(error);

    const store = {
        authentication: {
            registerNewAccount,
            login,
            logout,
        },
        user: {
            isLogged,
        },
        notifications: {
            error,
        }
    };

    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    );
}

