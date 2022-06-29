import Head from "next/head";
import style from "../styles/login.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { userRefForAcc } from "../components/Hooks";
import Loader from "../components/Loader";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const login = userRefForAcc();

    useEffect(() => {
        const ref = localStorage.getItem("refToken");

        if(ref){
            login(ref);
            router.push("/user/exepenses");
        }
    }, [])


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setIsLoading(true);
        try{
            const res = await fetch("/api/v1/auth/login", {
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })
    
            const data = await res.json();
            if(data.error){
                setIsLoading(false);
                setErr(data.error)
            }
            else{
                localStorage.setItem("refToken", data.refToken);
                login(data.refToken);
                router.push("/user/expenses");
            }
        }
        catch(e){
            setIsLoading(false);
            setErr("Check your network connection")
        }
        
    }


    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            {
                isLoading ? <Loader /> 
                :
                <div className={style.container}>
                    <div className={style.formSpace}>
                        <form action="/api/v1/auth/login" method="post" onSubmit={(e) =>handleFormSubmit(e)}>
                            {err ? <div className="w-75 mx-auto"><span className="p-2 alert alert-danger">{err}</span></div> : <></> }
                            <div className="my-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control my-2" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="my-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control my-2" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="w-25 mx-auto"> <input type="submit" value="Login" className="btn btn-dark"/></div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}