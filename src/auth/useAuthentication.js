import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from './firebaseInit.js'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    AuthErrorCodes,
    // onAuthStateChanged,
} from "firebase/auth";

const handleErrors = (error) => {
    switch (error.code) {
        case AuthErrorCodes.INVALID_PASSWORD:
            return "invalid password";
        case AuthErrorCodes.INVALID_EMAIL:
            return "invalid email";
        case AuthErrorCodes.EMAIL_EXISTS:
            return "email already in use";
        case AuthErrorCodes.USER_DELETED:
            return "User not found";
        case AuthErrorCodes.USER_DISABLED:
            return "User Disabled";
        case AuthErrorCodes.USER_SIGNED_OUT:
            return "User signed out";
        default:
            return "authentication error";
    }
};

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (userData) => {
        const {email, password} = userData;
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential;
        } catch (error) {
            throw new Error(handleErrors(error));
        }
    }
);

export const userSignUp = createAsyncThunk(
    'user/userSignUp',
    async (userData) => {
        const { email, password } = userData
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential;
        } catch (error) {
            throw new Error(handleErrors(error));
        }
    }
)

export const userSignOut = createAsyncThunk(
    'user/userSignOut',
    async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(handleErrors(error));
        }
    }
)
