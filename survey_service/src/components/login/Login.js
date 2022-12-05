import { useState } from "react";
import Axios from 'axios';


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const authenticateUser = () => {
        if (!email || !password) return false;

        Axios.post(`${props.host}authenticate_user`, {
            email: email,
            password: password
          }).then((response) => {
            props.loggedIn(response.data[0].UserID);
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