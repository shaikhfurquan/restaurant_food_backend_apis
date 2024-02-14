import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    title : {
        type : String,
        required : [true , 'Food title is required']
    },
    description : {
        type : String,
        required : [true , 'Food description is required']
    },
    price : {
        type : Number,
        required : [true , 'Food price is required']
    },
    imageUrl : {
        type : String,
        default : 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    foodTags : {
        type : String,
    },
    category : {
        type : String,
    },
    code : {
        type : String,

    },
    isAvailable : {
        type : Boolean,
        default : true,
    },
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Restaurant'
    },
    reting :{
        type : Number,
        default : 5,
        min : 1,
        max : 5
    },
    ratingCount : {
        type : String,
    }
}, {timestamps : true})


const FoodModel = mongoose.model('Food' , foodSchema)

export default FoodModel