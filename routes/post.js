const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()
const db = require('../db/db.js')
const axios = require('axios')

dotenv.config()

router.post(`/api/${process.env.APIKEY}`, async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            const clearSQL = `DELETE FROM quote;`;
            db.query(clearSQL, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        
        await new Promise((resolve, reject) => {
            const resetSQL = `ALTER TABLE quote AUTO_INCREMENT = 1;`;
            db.query(resetSQL, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const result = await axios.get('https://brapi.dev/api/quote/list');
        const data = result.data.stocks

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        const SQL = `INSERT INTO quote (ticker, name, price, variation, logo, sector, creation_date) 
                     VALUES (?, ?, ?, ?, ?, ?, ?);`;

        for (const stock of data) {
            const values = [
                stock.stock,
                stock.name,
                stock.close,
                stock.change,
                stock.logo,
                stock.sector,
                formattedDate
            ];

            await new Promise((resolve, reject) => {
                db.query(SQL, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        res.json({ message: "Data inserted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router