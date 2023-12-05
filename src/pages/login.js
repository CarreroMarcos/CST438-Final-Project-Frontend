import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { loginAccount } from "../data/accounts";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const login = async () => {
        await loginAccount(email, password)
        if(sessionStorage.getItem('jwt')) {
            navigate("/")
        }
    }
    
    return (
        <>
            <Menu currentPage={"/"} />
            <div className="signup">
                <form method="">
                    <h3>Sign In</h3>
                    <div className='field'>
                        <p className='label'>Username</p>
                        <input className='input wide' type='text' autoComplete="username" name='username' placeholder='Ben' onChange={(e) => {setEmail(e.target.value)}}></input>
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