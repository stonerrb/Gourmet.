const FoodItems = require("../models/food_items");
const Profile = require("../models/profile");
const { default: mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "pending",
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Profile,
        required: true,
    },
    food_items:[{
        food_item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: FoodItems,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    PaymentMethod: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    notes: {
        type: String,
        default: "",
    },
    final_price: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("Cart", CartSchema);