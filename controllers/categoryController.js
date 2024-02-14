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

        const category = await CategoryModel.create({ title, imageUrl })
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating category",
            error: error.message
        })
    }
}


export const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find()
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "All categories List",
            totalCategories: categories.length,
            categories: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting all categories",
            error: error.message
        })
    }
}



export const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found with this id",
            })
        }
        res.status(200).json({
            success: true,
            category: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting category",
            error: error.message
        })
    }
}


export const updateCategory = async (req, res) => {
    try {
        const id = req.params
        const { title, imageUrl } = req.body
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Please provide category Id"
            })
        }
        const updateCategory = await CategoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })

        if (!updateCategory) {
            return res.status(500).json({
                success: false,
                message: "Category not found with this id",
            })
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            updateCategory: updateCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating category",
            error: error.message
        })
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Please provide category Id"
            })
        }
        const deleteCategory = await CategoryModel.findByIdAndDelete(id)

        if (!deleteCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found with this id",
            })
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting category",
            error: error.message
        })
    }
}