const { Schema, model } = require("../db/connection"); // import Schema & model

// Transaction Schema
const TransactionSchema = new Schema({
  user: { type: String },
  txnId: {
    type: String,
    unique: true, // Ensure uniqueness of txnId
  },
  amount: { type: Number },
  date: { type: Date },
});

// Transaction model
const Transaction = model("Transaction", TransactionSchema);

module.exports = Transaction;
