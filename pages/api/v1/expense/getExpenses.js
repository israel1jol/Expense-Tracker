import getExpense from "../../../../controller/expense/getExpense";

export default async function handler(req, res){
    if(req.method === "POST"){
        getExpense(req, res);
    }
    else{
        return res.status(404).send(`Cannot ${req.method} /getExpenses`);
    }
}