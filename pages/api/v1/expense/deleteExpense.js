import deleteExpense from "../../../../controller/expense/deleteExpense";

export default async function handler(req, res){
    if(req.method === "DELETE"){
        deleteExpense(req, res);
    }
    else{
        return res.status(404).send(`Cannot ${req.method} /deleteExpense1`);
    }
}