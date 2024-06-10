const mongoose = require('mongoose');
const validator=require('validator')
const User=require('./userModel');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tours must have name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [5, 'A tour name must have more or equal then 10 characters'],
        validator:[validator.isAlpha,'Tours name must have only containe alphabets']
    },
    duration: {
        type: Number,
        required: [true, 'A tours must have duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tours must have maxGroupSize']
    },
    difficulty: {
        type: String,
        required: [true, 'A tours must have difficulty'],
        enum:{
            values:['easy','medium','difficult'],
            message:'Difficulty is either easy,medium,difficult'
        }
    },
    price: {
        type: Number,
        required: [true, 'A tours have price']
    },
    ratingAverage: {
        type: Number,
        default: 4.5,
        minlength:[1,'Rating must be above 1.0'],
        maxlength:[5,'Rating must in between 1 and 5']
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price'
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tours must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tours must have an imageCover']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    guides:{
        type: [mongoose.Schema.ObjectId], 
        ref: 'User'
    },
    startLocation:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String
    },
    location:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String,
        day:Number
    },
    startDates: [Date]
}, {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 

},
);
// Define virtual property
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});

tourSchema.pre('save', async function(next){
   const guidesPromises= this.guides.map(async id=>await User.findById(id))
   this.guides= await Promise.all(guidesPromises);
});
// tourSchema.pre(/^find/,function(next){
//     this.populate({
//         path:'guides',
//         select:'-__v -passwordChangedAt'
//     })
// })
//make slug using 
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
