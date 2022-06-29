import Head from "next/head"; 
import style from "../../styles/Expense.module.scss";
import { AuthContext } from "../../components/AuthContext";
import { ExpenseContext } from "../../components/ExpenseContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Expenses(){
    let refreshToken;
    const router = useRouter();
    const { auth} = useContext(AuthContext);
    const { expenses, getExpenses, addExpense, deleteExpense } = useContext(ExpenseContext);

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Profit");
    const [err, setErr] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [trackedExpense, setTrackedExpense] = useState({});


    useEffect(() => {
        refreshToken = localStorage.getItem("refToken");
        if(!refreshToken){
            router.push("/404");
        }
    }, [refreshToken])

    useEffect(() => {
        getExpenses(auth.token);
    }, [auth.token])

    const calculateExpense = () => {
        if(expenses.length > 0){
            return expenses.map(expense => expense.amount).reduce((total, e) => total+e, 0);
        }
        return 0;
    }

    const getAbsValue = (amt) => {
        return Math.abs(amt);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        let realAmount = amount;
        if(type === "Loss"){
            realAmount = -amount;
        }
        const error = addExpense({title:title, amount:realAmount, token:auth.token});
        if(error){
            setErr("Could not add expense");
        }
        setAmount("");
        setTitle("");
        setType("Profit");
    }

    const handleDelRequest = (current_tracked_expense=trackedExpense) =>{
        if(showWarning){
            deleteExpense({token:auth.token, id:current_tracked_expense._id});
        }
        setShowWarning(prev => !prev);
        setTrackedExpense(current_tracked_expense);
    }


    return (
        <>
        <Head>
            <title>Expenses</title>
        </Head>
        { 
        showWarning ? 
        <div className={style.panel}>
            <div className={style.warningBox}>
                <h4>Do you really want to delete `{trackedExpense.title}`.</h4>
                <button className="btn btn-danger m-2" onClick={() => handleDelRequest()}>Delete</button>
            <button className="btn btn-light m-2" onClick={() => setShowWarning(false)}>Cancel</button>
            </div>
        </div> 
        : <></> 
        }
        <div className={style.container}>
            <div className={style.totalExpense}>
                <span className={
                    calculateExpense() <= 0 ? style.negativeBudget : style.positiveBudget
                }>$ {getAbsValue(calculateExpense())}</span>
                
            </div>
            <h2 className={style.expenseHeading}>Your Expenses</h2>
            { 
            expenses.length === 0 ? 
            <div className="text-center"><span className="lead">No Records Found</span></div> 
            :
            <div className={style.expenseList}>
                <ul>
                    {
                        expenses.map(expense => (
                            <li className={style.expenseListItem}  key={expense._id} onClick={() => handleDelRequest(expense)}>
                                <div className={ expense.amount <= 0 ? style.negativeExpensiveItem : style.positiveExpensiveItem}></div>
                                <div className={style.expenseBar}>
                                    <span>{expense.title}</span>
                                    <span>${getAbsValue(expense.amount)}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            }
            <div className={style.centeredField}><button className="btn btn-dark">Overview</button></div>
            <div className={style.formScene}>
                <div className={style.formPanel}>
                    <h3>Add Expense</h3>
                    <form action="/api/v1/expense/createExpense" method="post" className={style.form} onSubmit={(e) =>handleSubmit(e)}>
                        <div className={style.inputField}>
                            <input type="text" name="title" id="" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Expense Name" required/>
                        </div>
                        <div className={style.inputField}>
                            <input type="number" min="0" name="amount" id="" value={amount} onChange={(e) =>setAmount(e.target.value)} placeholder="Amount" required/>
                        </div>
                        <div className={style.inputField}>
                            <select name="type" className="form-select w-50" value={type} onChange={(e) => setType(e.target.value)} required>
                                <option value="Profit">Profit</option>
                                <option value="Loss">Loss</option>
                            </select>
                        </div>
                        <div className={style.centeredField}>
                            <input type="submit" value="Add" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

const getAbsValue = (amt) => {
    return Math.abs(amt);
}

