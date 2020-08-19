const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});
const app = require('./app');

//console.log(app.get('env')); //ddevelopement
//console.log(process.env)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
// const DB = process.env.DATABASE_LOCAL;


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

// const toursSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     rating:{
//         type:Number,
//         default:4.5
//     },
//     price:{
//         type:Number,
//         require:true
//     }
// })

// const Abc = mongoose.model('Abc', toursSchema);

// const testData = new Abc({
//     name:"Ram",
//     rating:4.8,
//     price:555
// })

// testData.save().then((data)=>{
//       console.log(data)
// }).catch((err)=>{
//       console.log(err)
// })



const port = process.env.PORT | 3000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})