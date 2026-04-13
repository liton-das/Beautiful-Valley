const express = require('express')
const dbConnection = require('./src/config/dbConnection')
const cors = require('cors')
const cookie = require('cookie-parser')
const { otpGenerator } = require('./src/utils/otpGenerator')
const router = require('./src/routes')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(cookie())
// Db connection 
dbConnection()
// rotue 
app.use(router)
app.listen(PORT,(e)=>{
    if(e){
        console.log('server not runing...',e)
    }
    console.log('server runing on this port',PORT)
})