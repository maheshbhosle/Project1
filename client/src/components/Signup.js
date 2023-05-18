import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
            name: "",
            email: "",
            phone: "",
            password: "",
            cpassword: ""
        })

        let name,
            value;
        const handleInputs = (e) => {
            name = e.target.name;
            value = e.target.value;
            setUser({
                ...user,
                [name]: value
            })
        }

        const postData = async (e) => {
            e.preventDefault();
            const {
                name,
                email,
                phone,
                password,
                cpassword
            } = user;
            const res = await fetch("./register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        name,
                        email,
                        phone,
                        password,
                        cpassword
                    }
                )
            })
            const data = await res.json();
            if (data.status === 422 || ! data) {
                window.alert("Invalid registration");
            } else {
                window.alert("Successful registration");
                navigate("/Login");
            }
        }
        return (
            <> {/* <div className = "outerContainer"> */}
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="circle"></div>
                            <header className="myHed text-center">
                                <i className="far fa-user"></i>
                                <p>SIGNUP</p>
                            </header>
                            <form method="POST" className="main-form text-center">
                                <div className="form-group my-0">
                                    <label className="my-0">
                                        <i className="fas fa-user"></i>
                                        <input type="text" name="name" className="myInput" placeholder="Username"
                                            value={
                                                user.name
                                            }
                                            onChange={handleInputs}/>
                                    </label>
                                </div>
                                <div className="form-group my-0">
                                    <label className="my-0">
                                        <i className="fas fa-envelope"></i>
                                        <input type="email" name="email" className="myInput" placeholder="E-mail"
                                            value={
                                                user.email
                                            }
                                            onChange={handleInputs}/>
                                    </label>
                                </div>
                                <div className="form-group my-0">
                                    <label className="my-0">
                                        <i class="fas fa-phone"></i>
                                        <input type="text" name="phone" className="myInput" placeholder="Phone"
                                            value={
                                                user.phone
                                            }
                                            onChange={handleInputs}/>
                                    </label>
                                </div>
                                <div className="form-group my-0">
                                    <label className="my-0">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" name="password" className="myInput" placeholder="Password"
                                            value={
                                                user.password
                                            }
                                            onChange={handleInputs}/>
                                    </label>
                                </div>
                                <div className="form-group my-0">
                                    <label className="my-0">
                                        <i className="fas fa-lock"></i>
                                        <input type="password" name="cpassword" className="myInput" placeholder="Confirm Password"
                                            value={
                                                user.cpassword
                                            }
                                            onChange={handleInputs}/>
                                        <br/>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <input type="submit" name="signup" className="form-control button" value="SignUp"
                                            onClick={postData}/>
                                    </label>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                {/* </div> */} </>
        )
    }

    export default Signup
