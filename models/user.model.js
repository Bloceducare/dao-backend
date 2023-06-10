const { Schema, model } = require("../db/connection") // import Schema & model

// User Schema
const UserSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    walletAddress: { type: String, unique: true },
    amount: { type: Number },
    transactionId: {
        type: [{
          txnId: {
            type: String,
            unique: true, // Ensure uniqueness of txnId
          },
          amount: { type: Number },
          date: { type: Date },
        }],
        default: [],
      },
})

// User model
const User = model("User", UserSchema)

module.exports = User