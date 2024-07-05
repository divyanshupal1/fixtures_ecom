import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import Loader from "./smallcomponents/Loader";
import Header from "./Header";
import LottieLoader from "./LottieLoader";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
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
    axiosInstance.post("/users/login",{ 
      username:username,
      password:password 
    })
      .then((res) => res.data)
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
    axiosInstance.post("/users/logout")
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


 
export function LoginCard({ toggleSignupPopup, setIsLoggedIn, toggleCartDrawer }) {
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
    axiosInstance.post("/users/login",{ 
      username:username,
      password:password 
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.success) {
          setMsg("Successfully logged in");
          setUser(data.data);
          setIsLoggedIn(true); // Set isLoggedIn state to true
          setLoading(false);
          navigate("/");
          setShowPopup(false);
        } else {
          if (data.statusCode === 401) {
            setMsg("Invalid Credentials");
          }
          if (data.statusCode === 404) {
            setMsg("User not found");
          } else {
            setMsg("Something went wrong");
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
    axiosInstance.post("/users/logout")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
          setIsLoggedIn(false);
          setMsg("Logged out successfully");
        } else {
          console.error("Logout failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }
  return (
    <div className="popup-container">
    <Card className="w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Username" size="lg" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <Input label="Password" size="lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={SignMeIN} disabled={loading}>
          Sign In
        </Button>
        {msg && <Typography variant="small" className="mt-6 flex justify-center text-red-500">
          {msg}
        </Typography>}
        <Typography variant="small" className="mt-6 flex justify-center ">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            onClick={() => {
              toggleSignupPopup();
              setShowPopup(false);
            }}
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
    </div>
  );
}