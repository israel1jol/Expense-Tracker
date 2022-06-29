import createExpense from "../../../../controller/expense/createExpense";

export default async function handler(req, res){
    if(req.method === "POST"){
        createExpense(req, res);
    }
    else{
        return res.status(404).send(`Cannot ${req.method} /createExpense`)
    }
}