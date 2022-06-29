import Navbar from "./Navbar";
import Head from "next/head";
import { ExpenseProvider } from "./ExpenseContext";
import {AuthProvider} from "./AuthContext";

export default function Layout({children}){
    
    return (
        <AuthProvider>
            <ExpenseProvider>
                <Navbar />
                <main>{ children }</main>
            </ExpenseProvider>
        </AuthProvider>
    )
}