import React from "react";
import { Link } from "react-router-dom";

const Login=()=>{
    return(
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <div>
                    <h2>Username</h2>
                    <input type="text" placeholder="Username" /><br />
                    <h2>Password</h2>
                    <input type="password" placeholder="Password" /><br />
                        <button type="submit">Login</button>
                        <br />
                        <p>Dont have an Account?</p> <Link to="/signup">Register here</Link>
                </div>

            </div>
            </div>
    )
}

export default Login;