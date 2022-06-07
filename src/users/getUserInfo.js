import { collection } from "firebase/firestore";
import { db } from "../auth/firebaseInit.js";


export const getUserInfo = async userID => {
    const userInfoDoc = await collection(db, 'users').doc(userID).get();
        const userInfo = userInfoDoc.data();
        if (!userInfo) return null;
        return {
            ...userInfo,
            id: userInfoDoc.id,
        }
};