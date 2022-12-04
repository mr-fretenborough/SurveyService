import { useState } from "react";
import Axios from 'axios';


function Login({ isReal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getUser = () => {
        Axios.get("http://18.207.227.234:3002/get_user", {
            email: email,
            password: password
        }).then((response) => {
            return response.user_id
        });
    }
    
    const authenticateUser = () => {
        if (!email || !password) return false;

        Axios.post("http://18.207.227.234:3002/authenticate_user", {
            email: email,
            password: password
          }).then((response) => {
            console.log(response.data);
            if (!response.data.length) {
                createUser();
            }
            // isReal(response.user_id);
          }).then((response) => {
            console.log(response);
          });
    }

    const createUser = (email, password) => {
        Axios.post("http://18.207.227.234:3002/create_user", {
            email: email,
            password: password
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