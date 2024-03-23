import React,{useState, useEffect} from "react";
import { Link,  useNavigate } from "react-router-dom";
import { LOGIN_URL, USER_ROUTE } from "./Constants";
import Loader from "./smallcomponents/Loader";

const Login=()=>{
    const navigate = useNavigate();
    const [user,setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState(null)
  
    const [loading, setLoading] = useState(0)
  
    useEffect(() => {
      if(username.length>5&&password.length>5) setLoading(0)
      else setLoading(3)
    }, [username,password])
  
    function SignMeIN(){
        // console.log(username, password);
        setLoading(1)
        fetch(LOGIN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ username:username, password:password }),
        }).then((res) => res.json()).then((data)=>{
          if(data.success) {
            console.log(data.data)
            setMsg("Successfully logged in")
            setUser(data.data)
            setLoading(2)
            
            alert("Logged In Successfully")
            navigate("/")
          }
          else{ 
            if(data.statusCode==401) {setMsg("Invalid Credentials");  alert("Invalid Credentials")}
            if(data.statusCode==404) {setMsg("User not found"); alert("User Not Found")}
            else {setMsg("Something went wrong"); alert("Something went wrong")}
            setLoading(0)
          }
        }).catch((err)=>{
          setMsg("Something went wrong")
          console.log(err)
          setLoading(0)
        })
    }
    const fetchUser = async () =>{
      const response = await fetch(USER_ROUTE+"/current-user",{
        method:"GET",
        credentials: 'include',
      });
      const data = await response.json();
      if(data.success){
        console.log(data.data)
      }
      else{
        console.log(data)
      }
    }

    return(
        <div className="login-container" style={{paddingTop:"120px"}}>
            <div className="login-form">
                <h1>Login</h1>
                <div>
                    <h2>Username</h2>
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/><br />
                    <h2>Password</h2>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
                        <button className="fill" onClick={SignMeIN} disabled={loading!=0&&true}>Login</button>
                        <br />
                        {/* <Loader /> */}
                        <p>Dont have an Account?</p> <Link to="/signup">Register here</Link>
                </div>

            </div>
            </div>
    )
}

export default Login;