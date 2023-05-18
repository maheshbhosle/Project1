import React, {useReducer} from 'react'
import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Logout from "./components/Logout"
import Todo from "./components/Todo"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"
import {initialState, reducer} from '../src/reducer/UseReducer';

export const UserContext = React.createContext();

const Routing = () => {
    return (
        <Routes>
            <Route path="Home"
                element={<Home/>}/>
            <Route path="/Todo"
                element={<Todo/>}/>
            <Route path="/Contact"
                element={<Contact/>}/>
            <Route path="/Login"
                element={<Login/>}/>
            <Route path="/Signup"
                element={<Signup/>}/>
            <Route path="/Logout"
                element={<Logout/>}/>
        </Routes>
    );
}


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <UserContext.Provider value={
                {state, dispatch}
            }>

                <Navbar/>
                <Routing/>
            </UserContext.Provider>
        </>
    )
}
export default App;
