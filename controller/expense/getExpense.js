import verifyAccessToken from "../../util/verifyAccessToken";
import Expense from "../../model/Expense";
import connect from "../../db/dbconnect";

export default async function(req, res){
    try{
        await connect();
        const user = await verifyAccessToken(req, res);
        const expense = await Expense.find({userId:user.id});
        return res.json(expense);
    }
    catch(e){
        return res.json({error:e});
    }
}