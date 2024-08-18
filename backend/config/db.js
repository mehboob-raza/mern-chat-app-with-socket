const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL)

        console.log(`mongoDB conected  : ${conn.connection.host} `);
        
    } catch (error ) {
        console.log(`error : ${error.message}`);
        
    }
}

module.exports = connectDB

