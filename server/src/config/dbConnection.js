const { default: mongoose } = require("mongoose")

const dbConnection = async()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/beautiful-valley?directConnection=true`)
        console.log('DB connected')
    } catch (e) {
        console.log('DB not connected',e)
    }
}
module.exports=dbConnection