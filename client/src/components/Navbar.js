import React, {useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";
import {UserContext} from '../App';


const Navbar = () => {

    const {state, dispatch} = useContext(UserContext);

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/Home">Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Todo">Tasks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Logout">Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/Home">Home
                        </NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to="/Todo">Tasks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                    </li> */}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Signup">Register</NavLink>
                    </li>
                </>
            )
        }
    }

    return (
        <> {/* navbar-light bg-light */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                {/* <a className="navbar-brand" href="#">Navbar</a> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto ">
                        <RenderMenu/>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
