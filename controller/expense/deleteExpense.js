import verifyAccessToken from "../../util/verifyAccessToken";
import Expense from "../../model/Expense";
import connect from "../../db/dbconnect";

export default async function(req, res){
    try{
        await connect();
        await verifyAccessToken(req, res);
        const id = req.body.id;
        const expense = await Expense.findOneAndDelete({_id:id});
        return res.status(200).json(expense);
    }
    catch(e){
        return res.json({error:e});
    }
}