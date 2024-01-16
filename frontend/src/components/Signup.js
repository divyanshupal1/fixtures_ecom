import React from "react";
import { Link } from "react-router-dom";

const Signup=()=>{
    return(
        <div className="login-container">
            <div className="login-form">
                <h1>Signup</h1>
                <div>
                    <h2>Username</h2>
                    <input type="text" placeholder="Username" /><br />
                    <h2>Password</h2>
                    <input type="password" placeholder="Password" /><br />
                    <h2>Confirm Password</h2>
                    <input type="password" placeholder="Password" /><br />
                        <button type="submit">Signup</button>
                        <br />
                        <p>Already have an Account?</p> <Link to="/login">Login here</Link>
                </div>

            </div>
            </div>
    )
}

export default Signup;