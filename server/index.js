const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000



app.listen(PORT,(e)=>{
    if(e){
        console.log('server not runing...',e)
    }
    console.log('server runing on this port',PORT)
})