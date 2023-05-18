const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
require("../DB/conn");
const User = require("../model/userSchema");

router.post("/register", async (req, res) => {
    const {
        name,
        email,
        phone,
        password,
        cpassword
    } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({error: "Error"});
    }

    try {
        const userExist = await User.findOne({email: email});

        if (userExist) {
            return res.status(422).json({Error: "Email already exists."});
        } else if (password != cpassword) {
            return res.status(422).json({Error: "passwords do not match"});
        } else {
            const user = new User({
                name,
                email,
                phone,
                password,
                cpassword
            });

            const userRegister = await user.save();

            if (userRegister) {
                res.status(201).json({message: "user registered successfully!"});
            } else {
                res.status(500).json({error: "Failed to register"});
            }
        }
    } catch (err) {
        console.log(err);
    }
});

// Login Route

router.post("/signin", async (req, res) => {
    // console.log(req.body);
    // res.json({ message: "working" });
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "Empty field(s)"});
        }

        const userLogin = await User.findOne({email: email});

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 259200000),
                httpOnly: true
            });

            if (isMatch) {
                res.json({message: "User Login Successful! "});
            } else {
                res.status(400).json({error: "credential error"});
            }
        } else {
            res.status(400).json({error: "credential error"});
        }
    } catch (err) {
        console.log(err);
    }
});
// Task

router.get("/Todo", authenticate, (req, res) => {
    console.log("Hello by Tasks");
    res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req, res) => {
    console.log("Hello by contact");
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async (req, res) => {
    try {
        const {name, email, phone, message} = req.body;
        if (!name || !email || !phone || !message) {
            console.log("Error in the contact form");
            return res.json({error: "Please fill the contact form"});
        }
        const userContact = await User.findOne({_id: req.userID});
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message)
            await userContact.save();
            res.status(201).json({message: "user Contact Success"})
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/Logout", (req, res) => {
    console.log("Hello by Logout");
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send("User Logout");
});
module.exports = router;
