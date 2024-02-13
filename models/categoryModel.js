import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , 'Category title is required']
    },
    imageUrl : {
        type : String,
        default : "https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp"
    }
}, {timestamps : true})


const CategoryModel = mongoose.model('Category' , categorySchema);


export default CategoryModel