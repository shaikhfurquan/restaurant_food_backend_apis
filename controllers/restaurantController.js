import RestaurantModel from "../models/restaurantModel.js"


export const createRestaurant = async (req, res) => {

    try {
        const { title, foods, pickup, delivery, isOpen, rating, imageUrl, time, logoUrl, ratingCount, code, coords } = req.body

        if(!title || !coords){
            return res.status(500).json({
                success: false,
                message: "Please provide a title and address"
            })
        }

        const newRestaurant = await RestaurantModel.create({title, foods, pickup, delivery, isOpen, rating, imageUrl, time, logoUrl, ratingCount, code, coords})

        res.status(200).json({
            success: true,
            message: "Restaurant created successfully",
            newRestaurant : newRestaurant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating restaurant",
            error: error.message
        })
    }
}