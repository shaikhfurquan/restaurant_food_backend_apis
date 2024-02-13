import CategoryModel from "../models/categoryModel.js"


export const createCategory = async (req, res) => {
    try {
        const { title, imageUrl } = req.body
        if (!title) {
            return res.status(500).json({
                success: false,
                message: "Please provid all fields"
            })
        }

        const category = await CategoryModel.create({title, imageUrl})
        res.status(201).json({
            success : true,
            message : "Category created successfully",
            category : category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating category",
            error: error.message
        })
    }
}