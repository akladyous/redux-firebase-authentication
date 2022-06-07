import { getReviews } from "../reviews/getReviews.js";
export default function Home() {

    getReviews()

    return (
        <>
            <div className="container">
                <h1>home page</h1>

                {/* <button onClick={handleSeed}>seed</button> */}
            </div>
        </>
    );
}
