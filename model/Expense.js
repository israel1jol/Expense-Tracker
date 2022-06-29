import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title:{type:String},
    userId:{type:String},
    amount:{type:Number}
}, {timestamps:true});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);