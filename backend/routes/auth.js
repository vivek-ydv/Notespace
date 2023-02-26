const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create s User Using: POSt "/api/auth/createuser". No login required
router.post('/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        // If there is errors then send the bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Check wheater a user already exist with this email or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Email is already in use, please try with a different email" });
            }
            // Create a new user 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })

module.exports = router;