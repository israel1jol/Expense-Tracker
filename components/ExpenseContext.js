import { createContext, useReducer } from "react";
import reducer from "./ExpenseReducer";

const _expenses = [];

const CLIENT_ROUTE_EXPENSE = "api/v1/expense";

export const ExpenseContext = createContext(_expenses);

export const ExpenseProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, _expenses);

    const getExpenses = async (token) => {
        const res = await fetch(`/${CLIENT_ROUTE_EXPENSE}/getExpenses`, {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                token:token
            })
        })

        const data = await res.json();
        if(!data.error){
            dispatch({type:"get_expenses", payload:data});
        }
        else{
            console.log(data.error)
        }
    }

    const addExpense = async (expense) => {
        const res = await fetch(`/${CLIENT_ROUTE_EXPENSE}/createExpense`, {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(expense)
        })

        const data = await res.json();
        if(!data.error){
            dispatch({type:"add_expense", payload:data});
        }
        else{
            return await data.error;
        }
    }

    const deleteExpense = async (req) => {
        const res = await fetch(`/${CLIENT_ROUTE_EXPENSE}/deleteExpense`, {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(req)
        })

        const data = await res.json();
        if(!data.error){
            dispatch({type:"delete_expense", payload:data});
        }
        else{
            return data.error
        }
    }

    const clearExpenseData = () => {
        dispatch({type:"clear"});
    }

    return (
        <ExpenseContext.Provider value={{expenses:state, getExpenses:getExpenses, addExpense:addExpense, deleteExpense:deleteExpense, clearAll:clearExpenseData}}>
            {children}
        </ExpenseContext.Provider>
    )
}