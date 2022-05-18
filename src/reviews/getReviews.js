import { db } from '../auth/firebaseInit.js'
import { collection } from "firebase/firestore";

export const getReviews = async restaurantId => {
    const querySnapshot = await collection(db, "reviews")
        .where("restaurantId", "==", restaurantId)
        .get();

        const reviews = querySnapshot.docs.map( doc =>({
            ...doc.data(),
            id: doc.id,
        }));

        return reviews;
}