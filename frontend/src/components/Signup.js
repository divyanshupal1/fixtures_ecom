import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_URL, USER_ROUTE } from "./Constants";
import Header from "./Header";

const Signup = ({ toggleLoginPopup }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    if (username.length > 5 && password.length > 5) setLoading(0);
    else setLoading(3);
  }, [username, password]);

  function RegisterMe() {
    setLoading(1);
    fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email, username: username, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMsg("Successfully registered");
          setUser(data.data);
          setLoading(2);
          setShowPopup(false);
          alert("Signed up Successfully");
          navigate('/login');
        } else {
          if (data.statusCode === 409) {
            setMsg("Username already exists");
            alert("User Already Exists");
            navigate('/login');
          } else {
            setMsg("Something went wrong");
            alert("Something went wrong");
          }
          setLoading(0);
        }
      })
      .catch((err) => {
        setMsg("Something went wrong");
        console.log(err);
        setLoading(0);
      });
  }

  const fetchUser = async () => {
    const response = await fetch(USER_ROUTE + "/current-user", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      console.log(data.data);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="popup-container">
          <div className="container" style={{ width: "50%" }}>
            <div className="login-container" style={{ paddingTop: "120px" }}>
              <div className="login-form">
                <h1>Signup</h1>
                <div>
                  <h2>Email</h2>
                  <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                  <h2>Username</h2>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                  <h2>Password</h2>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                  <button className="fill" onClick={RegisterMe} disabled={loading != 0 && true}>Signup</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
