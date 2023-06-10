const { Schema, model } = require("../db/connection") // import Schema & model

// User Schema
const UserSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    walletAddress: { type: String },
    amount: { type: Number },
    transactionId: []
})


// User model
const User = model("User", UserSchema)

module.exports = User