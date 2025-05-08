import User from "../models/User.js"

// Update User CartData : /api/cart/update
export const updateCart = async (req, res)=>{
    console.log("this is a updated cart")
    try {
        const {userId, cartItems} = req.body
        console.log("body is working" ,req.body)
        await User.findByIdAndUpdate(userId, {cartItems})

        
        const updatedUser = await User.findById(userId);

        console.log("Updated user data:", updatedUser);
        
        res.json({success: true, message: "The Cart is Updated", cartData: cartItems, user: updatedUser })
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}