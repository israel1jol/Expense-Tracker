import verifyAccessToken from "../../util/verifyAccessToken";
import Expense from "../../model/Expense";
import connect from "../../db/dbconnect";

export default async function(req, res){
    try{
        await connect();
        const user = await verifyAccessToken(req, res);
        const title = req.body.title;
        const amount = req.body.amount;
        const id = user.id;
        const expense = await Expense.create({title:title, amount:amount, userId:id});
        return res.status(200).json(expense);
    }
    catch(e){
        return res.status(401).json({error:e});
    }
}