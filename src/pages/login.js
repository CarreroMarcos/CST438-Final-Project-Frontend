import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const login = () => {
        sessionStorage.setItem("jwt", email)
        navigate("/")
    }
    
    return (
        <>
            <Menu currentPage={"/"} />
            <div className="signup">
                <form method="">
                    <h3>Sign In</h3>
                    <div className='field'>
                        <p className='label'>Email</p>
                        <input className='input wide' type='text' autoComplete="email" name='email' placeholder='bmeier@csumb.edu' onChange={(e) => {setEmail(e.target.value)}}></input>
                    </div>
                    <div className='field'>
                        <p className='label'>Password</p>
                        <input className='input wide' type='password' autoComplete="password" name='password' placeholder='password' onChange={(e) => {setPassword(e.target.value)}}></input>
                    </div>
                    <button type="button" className="main_button" onClick={login}>Login</button>
                    <div className="sign_up_options">
                        <Link to="/signup">Need an account?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}