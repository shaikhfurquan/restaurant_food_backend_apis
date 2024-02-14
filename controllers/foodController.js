import FoodModel from '../models/foodModel.js'

export const createFood = async(req,res)=>{
    try {
        // const newFood = await (await FoodModel.create(req.body)).populate('restaurant')
        const newFood = await FoodModel.create(req.body)
        
        res.status(200).json({
            success : true,
            message : "Food created successfully",
            newFood : newFood
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while creating food",
            error : error.message
        })
    }
}


export const getAllFoods = async(req,res)=>{
    try {
        
        // const allFoods = await FoodModel.find()
        const allFoods = await FoodModel.find().populate('restaurant')
        if(!allFoods){
            return res.status(400).json({
                success : false,
                message : "No food items found"
            })
        }
        
        res.status(200).json({
            success : true,
            message : "All Food Lists",
            foodCount : allFoods.length,
            allFoods : allFoods
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while getting food lists",
            error : error.message
        })
    }
}
export const getFoodById = async(req,res)=>{
    try {

        const food = await FoodModel.findById(req.params.id)
        if(!food){
            return res.status(400).json({
                success : false,
                message : "No food found with this Id"
            })
        }
        
        res.status(200).json({
            success : true,
            message : "Food",
            food : food
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while getting food",
            error : error.message
        })
    }
}


export const getFoodByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.params.id
        if(!restaurantId){
            res.status(404).json({
                success : false,
                message : "Please provide a restaurant Id"
            })
        }

        const food = await FoodModel.find({restaurant : restaurantId})
        console.log("hello===>" , food);
        if(!food){
            return res.status(404).json({
                success : false,
                message : "No food found with this Id"
            })
        }
        res.status(200).json({
            success : true,
            message : "Food based on restaurant",
            food : food
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while getting food by restaurant",
            error : error.message
        })
    }
}