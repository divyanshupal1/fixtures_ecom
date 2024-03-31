import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, USER_ROUTE, LOGOUT_URL } from "./Constants";
import Loader from "./smallcomponents/Loader";
import Header from "./Header";
import LottieLoader from "./LottieLoader";

const Login = ({ toggleSignupPopup, setIsLoggedIn, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (username.length > 5 && password.length > 5) setLoading(false);
    else setLoading(true);
  }, [username, password]);

  function SignMeIN() {
    setLoading(true);
    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMsg("Successfully logged in");
          setUser(data.data);
          setIsLoggedIn(true); // Set isLoggedIn state to true
          setLoading(false);
          alert("Logged In Successfully");
          navigate("/");
          setShowPopup(false);
        } else {
          if (data.statusCode === 401) {
            setMsg("Invalid Credentials");
            alert("Invalid Credentials");
          }
          if (data.statusCode === 404) {
            setMsg("User not found");
            alert("User Not Found");
          } else {
            setMsg("Something went wrong");
            alert("Something went wrong");
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        setMsg("Something went wrong");
        console.log(err);
        setLoading(false);
      });
  }

  function handleLogout() {
    fetch(LOGOUT_URL, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
          setIsLoggedIn(false);
          alert("Logged out successfully");
        } else {
          console.error("Logout failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <>
      {showPopup && (
        <div className="popup-container">
          <div className="container" style={{ width: "50%" }}>
            <div className="login-container">
              <div className="login-form" style={{ marginTop: "120px" }}>
                <h1>Login</h1>
                <div>
                  <h2>Username</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br />
                  <h2>Password</h2>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <button className="fill" onClick={SignMeIN} disabled={loading}>
                    Login
                  </button>
                  <br />
                  <p>
                    Don't have an Account?{" "}
                    <button
                      onClick={() => {
                        toggleSignupPopup();
                        setShowPopup(false);
                      }}
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className="logout" style={{ position: 'fixed', top: '45px', right: '20px', zIndex: "1000" }}>
          <button onClick={handleLogout} style={{ backgroundColor: "#ffde16", padding: "4px 10px", borderRadius: "8px" }}>Logout</button>
          <li className="menu-item" onClick={toggleCartDrawer}><i className="fa-solid fa-cart-shopping"></i>Cart</li>
        </div>
      )}

    </>
  );
};

export default Login;
