const { default: mongoose } = require('mongoose');
const mongooes=require('mongoose');
const { MONGODB_CONNECTION_STRING } = require('.');

const dbconnect =  async ()=>{
    try{
             const conn = await mongoose.connect(MONGODB_CONNECTION_STRING)
             console.log(`Database connect host: ${conn.connection.host}`);
             
    }catch(error){
        console.log(`error  ha ${error}`);
        
    }
}

module.exports =dbconnect