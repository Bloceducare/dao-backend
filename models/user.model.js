const { Schema, model } = require("../db/connection") // import Schema & model

// User Schema
const UserSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    walletAddress: { type: String },
    amount: { type: Number },
    transactionId: [
        {
            amount: { type: Number },
            txnId: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
})

// User model
const User = model("User", UserSchema)

module.exports = User