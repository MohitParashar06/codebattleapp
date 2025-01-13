const mongoose = require('mongoose');

const connetDB = async()=>{
    return await mongoose.connect(process.env.DATABASE_URL)
}


module.exports = connetDB;