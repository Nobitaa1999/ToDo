const mongoose=require('mongoose');

require('dotenv').config();

const dbconnect=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/to_dos')
    .then(()=>{console.log('db connection successfully');})
    .catch((err)=>{
        console.error(err);
    })
}

module.exports=dbconnect;