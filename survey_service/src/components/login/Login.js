import { useState } from "react";
import Axios from 'axios';


function Login({ loggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const authenticateUser = () => {
        if (!email || !password) return false;

        Axios.post("http://18.207.227.234:3002/authenticate_user", {
            email: email,
            password: password
          }).then((response) => {
            loggedIn(response.data[0].UserID);
          });
    }

    return (
        <div>
            <input id="emailbox" type="text" placeholder="Your Email..." onChange={(e) => setEmail(e.target.value)}></input>
            <input id="passwordbox" type="text" placeholder="Your Password..." onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={() => authenticateUser()}>Submit</button>
        </div>
    )
}

export default Login;