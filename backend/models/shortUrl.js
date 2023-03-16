const mongoose= require('mongoose')
const shortUrlSchema = mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model("URL", shortUrlSchema);