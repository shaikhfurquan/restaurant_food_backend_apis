import OrderModel from "../models/orderModel.js"


export const placeOrder = async (req, res) => {
    try {
        const { cart, payment } = req.body
        if (!cart) {
            return res.status(500).json({
                success: false,
                message: 'Please provide a cart'
            })
        }
        //calculating the price
        let totalPrice = 0
        cart.map((item) => {
            totalPrice += item.price
        })

        const newOrder = await OrderModel.create({
            foods: cart,
            payment: totalPrice,
            buyer: req.body.id
        })

        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            newOrder: newOrder
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while order placing",
            error: error.message
        })
    }
}


export const changeOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id
        const { status } = req.body
        if(!status){
            return res.status(500).json({
                success: false,
                message: "Please provide status"
            })
        }

        const order = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order : order
        }) 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while order status update",
            error: error.message
        })
    }
}




