import RestaurantModel from "../models/restaurantModel.js"


export const createRestaurant = async (req, res) => {

    try {
        const { title, foods, pickup, delivery, isOpen, rating, imageUrl, time, logoUrl, ratingCount, code, coords } = req.body

        if (!title || !coords) {
            return res.status(500).json({
                success: false,
                message: "Please provide a title and address"
            })
        }

        const newRestaurant = await RestaurantModel.create({ title, foods, pickup, delivery, isOpen, rating, imageUrl, time, logoUrl, ratingCount, code, coords })

        res.status(200).json({
            success: true,
            message: "Restaurant created successfully",
            newRestaurant: newRestaurant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating restaurant",
            error: error.message
        })
    }
}


export const getAllRestaurants = async (req, res) => {
    try {
        const allRestaurants = await RestaurantModel.find()
        if (!allRestaurants) {
            return res.status(404).json({
                success: false,
                message: "Restaurants not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Restaurants Lists",
            totalCount: allRestaurants.length,
            allRestaurants: allRestaurants
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting restaurants lists",
            error: error.message
        })
    }
}


export const getRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id
        const restaurant = await RestaurantModel.findById(restaurantId)
        if (!restaurant) {
            return res.status(200).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Restaurant",
            restaurant: restaurant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting restaurant",
            error: error.message
        })
    }
}


export const updateRestaurantById = async (req, res) => {
    try {
        const updateRestaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        //if we have id but restaurant doesn't present 
        if (!updateRestaurant) return res.status(404).json({
            success: false,
            message: "Invalid ID..."
        })

        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully...",
            updateRestaurant : updateRestaurant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating restaurant",
        })
    }
}

export const deleteRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id
        if (!restaurantId) {
            return res.status(404).json({
                success: false,
                message: "Please provide restaurant Id"
            })
        }

        const deletedRestaurant = await RestaurantModel.findByIdAndDelete(restaurantId)
        if (!deletedRestaurant) {
            return res.status(404).json({
                success: false,
                message: `Restaurant with this Id not found.`,
            });
        }

        res.status(200).json({
            success: true,
            message: "Restaurant Deleted Successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting restaurant",
            error: error.message
        })
    }
}