import { db } from '../auth/firebaseInit.js'
import { collection } from "firebase/firestore";
import { getUserInfo } from '../users/getUserInfo.js';


export const getReviews = async restaurantId => {
    const querySnapshot = await collection(db, "reviews")
        .where("restaurantId", "==", restaurantId)
        .get();

        const reviews = querySnapshot.docs.map( doc =>({
            ...doc.data(),
            id: doc.id,
        }));
        console.log(reviews);

        const populatedReviews = await mapAsync(reviews, async (review) => {
            const author = await getUserInfo(review.userId);
            return {
                ...review,
                author,
            };
        });

        return populatedReviews;
}