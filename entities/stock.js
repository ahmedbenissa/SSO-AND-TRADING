const mongoose = require('mongoose')
const StockSchema = mongoose.Schema({
    timestamp:Date,
    high:Number,
    low:Number,
    close:Number,
    Volume:String,
    change:String,
    Stock_Symbol:String
})
module.exports=mongoose.model("Stocks",StockSchema)