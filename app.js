const express = require('express')
const router = require('./routes/routes.js')
const dotenv = require('dotenv')
const db = require('./db/db.js')
const https = require('https')

const app = express()
const server = https.createServer(app);

db.connect()
dotenv.config()

const port = process.env.PORT

app.use(express.json())
app.use("/", router.getRouter)
app.use("/", router.postRouter)


app.listen(port, () =>{
    console.log(`${port}`)
})