const mongoose = require("mongoose");
const { MDB_URL } = require("./lib/config")

mongoose
    .connect(MDB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },(err)=>{
        if(err) return console.log(err)
        console.log('Connected to mongodb')
    }
)

module.exports = mongoose;
