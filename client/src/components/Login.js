import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../App';


const Login = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {email, password}
            )
        });
        const data = res.json();
        if (res.status === 400 || ! data) {
            window.alert("Invalid Credentials")
        } else {
            dispatch({type: "USER", payload: true})
            window.alert("Login succefull!")
            navigate("/home");
        }

    }
    return (
        <>
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <div class="circle"></div>
                        <header class="myHed text-center">
                            <i class="far fa-user"></i>
                            <p>LOGIN</p>
                        </header>
                        <form method="POST" class="main-form text-center">
                            <div class="form-group my-0">
                                <label class="my-0">
                                    <i class="fas fa-user"></i>
                                    <input type="email" class="myInput"
                                        value={email}
                                        onChange=
                                        {(e)=> setEmail(e.target.value)}
                                        placeholder="Your Email"/>
                                </label>
                            </div>
                            <div class="form-group my-0">
                                <label class="my-0">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" class="myInput"
                                        value={password}
                                        onChange=
                                        { (e) => setPassword(e.target.value)}
                                        placeholder="Password"/>

                                    <br/>
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="button" class="form-control button" value="LOGIN"
                                        onClick={loginUser}/>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
