import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export async function createAddress(req, res) {
    try {
        const { address_line, city, state, pincode, mobile } = req.body;
        if (!address_line, !city, !state, !pincode) {
            return res.status(400).json({
                message: "Please provide mandatory detials.",
                error: true,
                success: false
            })
        }

        const payload = {
            address_line, city, state, pincode, mobile
        }

        const newAddress = new AddressModel(payload);
        const save = await newAddress.save();

        await UserModel.findByIdAndUpdate(req.userId, {
            $push: { address_details: save._id }
        }, {new:true});

        return res.json({
            message: "Address added successfully!",
            error: false,
            success: true,
            data: save
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export async function getAllAddress(req, res){
    try{
        const userId = req.userId;

        const user = await UserModel.findOne(userId).populate("address_details");

        if(!user){
            return res.status(400).json({
                message: "You are not authorized login first.",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "Address fetched successfully!",
            error: false,
            success: true,
            data: user.address_details
        })
    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}