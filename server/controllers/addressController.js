import Address from "../models/Address.js"

// Add Address : /api/address/add



export const addAddress = async (req, res) => {
    try {
        console.log("BODY RECEIVED =>", req.body);

        const { address, userId } = req.body;

        if (!address || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing address or userId",
            });
        }

        // Optional: convert pincode to number if needed
        const fullAddress = {
            ...address,
            userId,
            pincode: Number(address.pincode),
        };

        await Address.create(fullAddress);

        res.json({ success: true, message: "The Address is added Successfully" });
    } catch (error) {
        console.log("Mongoose Error =>", error.message);
        res.json({ success: false, message: error.message });
    }
};


// Get Address : api/addrees/get
export const getAddress = async(req, res)=>{
    try {
        const {userId} = req.body
        const addresses = await Address.find({userId})
        res.json({success: true, addresses})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}