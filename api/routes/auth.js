const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");
const { JWT_SECRET } = require('../../config/keys');

//ROUTE 1: Create a User Using: POST "/api/auth/createuser". No login required
router.post('/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;
        // If there is errors then send the bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            // Check wheater a user already exist with this email or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                success = false;
                return res.status(400).json({ success, error: "Email is already in use, please try with a different email" });
            }
            // Creating a secure password with bcryptjs
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            // Create a new user 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


//ROUTE 2: Authenticate a User Using: POST "/api/auth/login". No login required
router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password Cannot be blank').exists(),
    ],
    async (req, res) => {
        let success = false;
        // If there is errors then send the bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            // check existence in database
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }
            // Compares the password 
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


//ROUTE 3: Get loggedin user details Using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;