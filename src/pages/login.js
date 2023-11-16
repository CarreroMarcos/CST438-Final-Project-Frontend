import { useState } from "react";
import { redirect } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const login = () => {
        sessionStorage.setItem("email", email)
        redirect("/")
    }
    
    return (
        <>
            <div className="login">
                <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}></input>
                <button onClick={() => {login()}}>Login</button>
            </div>
        </>
    )
}