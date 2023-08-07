const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

router.get('/api/stocks', (req, res) => {
    if(!req.query.ticker){
        const SQL = "SELECT * FROM quote;"
        db.query(SQL, (err, result) =>{
            res.json({stocks: result})
        })
    }
    else{
        const SQL = "SELECT * FROM quote WHERE ticker = ?;"
        db.query(SQL,[req.query.ticker], (err, result) =>{
            res.json({stocks: result})
        })
    }
})

module.exports = router;