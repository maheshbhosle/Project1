import React, {useEffect, useContext} from 'react'
import Login from './Login'
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../App';


const Logout = () => {

    const {state, dispatch} = useContext(UserContext);


    const navigate = useNavigate();
    useEffect(() => {
        fetch('/Logout', {
            method: "GET",
            headers: { // Accept: "application/json",
                "Content-Type": "application/json"
            }
            // credentials: "include"
        }).then((res) => {
            dispatch({type: "USER", payload: false})
            navigate("/Home");
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        });
    })

    return (
        <>
            <h1>Signed out!</h1>
        </>
    )
}

export default Logout
