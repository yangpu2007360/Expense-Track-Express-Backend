const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
}
)

const TransactionModel = mongoose.model("transactions", TransactionSchema)

module.exports = TransactionModel