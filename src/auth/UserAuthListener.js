import { useEffect } from "react";
import { auth } from "./firebaseInit.js";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
    userState,
    setUserStatus,
    setUser,
    setError,
    resetState,
} from "../features/users/userSlice.js";

export default function UserAuthListener({ children }) {
    const dispatch = useDispatch();
    const {user} = useSelector(userState)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                if (currentUser) {
                    dispatch(setUserStatus(true));
                    dispatch(setUser(currentUser));
                } else {
                    dispatch(resetState());
                }
            },
            (error) => {
                dispatch(setError(error.message));
            }
        );

        return () => unSubscribe;

    }, [dispatch, user]);

    return <>{children}</>;
}
