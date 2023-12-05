import { useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import { createAccount } from "../data/accounts"

export default function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const signUpWithEmail = () => {
        createAccount(username, password, email).then(() => {
            navigate("/login")
        })
    }

    return (
        <>
            <Menu currentPage={"/"} />
            <div className="signup">
                <form method="">
                    <h3>Sign up</h3>
                    <div className='field'>
                        <p className='label'>Username</p>
                        <input className='input wide' type='text' autoComplete="username" name='username' placeholder='Ben' onChange={(e) => {setUsername(e.target.value)}}></input>
                    </div>
                    <div className='field'>
                        <p className='label'>Email</p>
                        <input className='input wide' type='text' autoComplete="email" name='email' placeholder='bmeier@csumb.edu' onChange={(e) => {setEmail(e.target.value)}}></input>
                    </div>
                    <div className='field'>
                        <p className='label'>Password</p>
                        <input className='input wide' type='password' autoComplete="password" name='password' placeholder='password' onChange={(e) => {setPassword(e.target.value)}}></input>
                    </div>
                    <button type="button" className="main_button" onClick={signUpWithEmail}>Sign up</button>
                    <div className="sign_up_options">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}