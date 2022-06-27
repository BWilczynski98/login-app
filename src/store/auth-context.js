import React, { createContext, useState } from 'react';
import { auth } from '../firebase/firebase-config';
export const AuthContext = createContext();

export const AuthStore = ({ children }) => {



    const store = {

    };

    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    );
}

