import React, {useEffect, useState} from "react";

const Contact = () => {
    const [userData, setUserData] = useState({name: "", email: "", phone: "", message: ""});
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            // console.log(data);
            setUserData({
                ...userData,
                name: data.name,
                email: data.email,
                phone: data.phone
            });
            if (! res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log("error here")
        }
    }
    useEffect(() => {
        userContact();
        // eslint-disable-next-line
    }, []);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({
            ...userData,
            [name]: value
        });
    }
    const contactForm = async (e) => {
        e.preventDefault();
        const {name, email, phone, message} = userData;
        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {name, email, phone, message}
            )
        });
        const data = await res.json();
        if (! data) {
            console.log("Message not sent")
        } else {
            setUserData({
                ...userData,
                message: ""
            })
            alert("Message sent")
        }
    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="circle"></div>
                        <header className="myHed text-center">
                            <i className="far fa-user"></i>
                            <p>Contact Us</p>
                        </header>
                        <form method="POST" className="main-form text-center">
                            <div className="form-group my-0">
                                <label className="my-0">
                                    <i className="fas fa-user"></i>
                                    <input type="text" name="name" className="myInput"
                                        onChange={handleInput}
                                        value={
                                            userData.name
                                        }
                                        placeholder="Your Name"/>
                                </label>
                            </div>
                            <div className="form-group my-0">
                                <label className="my-0">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" name="email" className="myInput"
                                        onChange={handleInput}
                                        value={
                                            userData.email
                                        }
                                        placeholder="Your E-mail"/>
                                </label>
                            </div>
                            <div className="form-group my-0">
                                <label className="my-0">
                                    <i class="fas fa-phone"></i>
                                    <input type="number" name="phone" className="myInput"
                                        onChange={handleInput}
                                        value={
                                            userData.phone
                                        }
                                        placeholder="Your Phone"/>
                                </label>
                            </div>
                            <div className="form-group my-0">
                                <label className="my-0">
                                    <br/>
                                    <textarea type="text" name="message" className="myInput"
                                        onChange={handleInput}
                                        value={
                                            userData.message
                                        }
                                        placeholder="Your Message"/>
                                    <br/>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>
                                    <input type="submit"
                                        onClick={contactForm}
                                        name="signup"
                                        className="form-control button"
                                        value="Submit"/>
                                </label>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact
