const mongoose = require("mongoose");
require('dotenv').config()

const DB_CONNECTCION = mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log({MSG : `DB Connected Hopefully`});
})
.catch((err)=>{
    console.log({err:err});
})

module.exports = DB_CONNECTCION;