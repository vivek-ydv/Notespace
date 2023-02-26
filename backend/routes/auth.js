const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create s User Using: POSt "/api/auth/". Doesn't require auth
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})


module.exports = router;