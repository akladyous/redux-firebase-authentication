import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../features/users/userSlice.js";
import { userSignUp } from "../auth/useAuthentication.js";

export default function UsersSignup() {

    const state = useSelector(userState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const formValidation = password === passwordConfirmation && email !== "";
    // const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        if (formValidation && !state.isAuthenticated) {
            dispatch(userSignUp({ email, password }))
        };
    };

    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignUp Page
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
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
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
                                    <label htmlFor="passwordConfirmation">
                                        Password Confirmation
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        className="form-control"
                                        placeholder=""
                                        value={passwordConfirmation}
                                        onChange={(e) => {
                                            setPasswordConfirmation(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>

                                <div className="mb-2">
                                    <p
                                        disabled
                                        id='current-statuss'
                                        className="text-center border-0 form-control"
                                        aria-describedby="response"
                                    >
                                        {
                                            (state.isAuthenticated)
                                                ? 'Account created Successfully'
                                                : state.error
                                        }
                                    </p>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button
                                            disabled={state.isAuthenticated}
                                            type="submit"
                                            className="btn btn-light"
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
        </div>
    );
}
