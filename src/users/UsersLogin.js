import { auth } from "../auth/firebaseInit.js";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../auth/firebaseInit.js";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../auth/useAuthentication.js";
import { userState } from "../features/users/userSlice.js";
// import { useNavigate } from "react-router-dom";

export default function UsersLogin() {
    const dispatch = useDispatch();
    const state = useSelector(userState);

    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();
        dispatch(userLogin({ email, password }));
        // if (state.isAuthenticated) {
        //     setTimeout(() => {
        //         navigate('/')
        //     }, 3000);
        // }
    };

    const getUser = async (userID) => {
        const currentUser = auth.currentUser;
        const currentUserRef = doc(db, 'users', currentUser.uid);


        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('first_name', '==', 'will'));
        const querySnapshot = await getDocs(q);
        console.log("document data : ", querySnapshot);

        querySnapshot.forEach((doc) => {
            console.log("doc.id : ", doc.data(), 'usrer id : ', userID);

        });
        console.log('user id : ', currentUser.uid);
        console.log('currentUserRef : ', currentUserRef)
    }


    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignIn Page
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={require("../assets/images/avatar.jpeg")}
                                    className="card-img-top mx-auto"
                                    alt="avatar"
                                    style={{ width: "25%", height: "25%" }}
                                />
                            </div>
                            <form onSubmit={handleForm}>
                                <div className="mb-2">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder=""
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder=""
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <p
                                        disabled
                                        className="text-center border-0 form-control"
                                        aria-describedby="response"
                                    >
                                        {state.isAuthenticated
                                            ? "login successfully completed"
                                            : state.error}
                                    </p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button
                                            type="submit"
                                            className="btn btn-light"
                                            disabled={state.isAuthenticated}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="div" style={{ margin: "20px auto", width: "50%" }}>
                <button onClick={getUser} style={{ margin: 'auto', display: 'block' }}>userInfo</button>
            </div>
        </div>
    );
}
