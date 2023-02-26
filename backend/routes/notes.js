const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("notes are here");
})


module.exports = router;