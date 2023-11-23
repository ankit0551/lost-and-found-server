const mongoose = require('mongoose');

const connectDB = ()=>{ mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err);
})
}

module.exports = connectDB;
