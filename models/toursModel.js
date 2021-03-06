const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    duration:{
        type:Number,
        required:[true, 'A tour most have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'A tour must have a group size']
    },
    difficulty:{
        type:String,
        required:[true, 'A tour must have a difficulty'] 
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true,
    },
    priceDiscount:{
        type:Number
    },
    summary:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'A tour must have a description']
    },
    imageCover:{
        type:String,
        required:[true, 'A tour must have a cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date]
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;