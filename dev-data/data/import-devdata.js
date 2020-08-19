const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const Tour = require('../../models/toursModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);


mongoose.connect(DB, {
   useNewUrlParser: true,
   useCreateIndex:true,
   useFindAndModify:false ,
   useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to DB")
}).catch(err=>{
    console.log(err);
});

//Read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into database

const importData = async()=>{
    try{
       await Tour.create(tours);
       console.log('Data successfully saved  ')
    }
    catch(err){
       console.log(err);
    }
    process.exit();
}

const deleteData = async()=>{
    try{
       await Tour.deleteMany();
       console.log('Data removed saved  ')
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

console.log(process.argv)

if(process.argv[2]==='--import'){
    importData();
}else if(process.argv[2]=='--delete'){
    deleteData();
}else{
    console.log('Thank you')
}