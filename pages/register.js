import Head from "next/head";
import style from "../styles/Register.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

export default function Register(){
    const [ firstn, setFn ] = useState("");
    const [ lastn, setLn ] = useState("");
    const [ usern, setUn ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ pass, setPass ] = useState("");
    const [ rePass, setRePass ] = useState("");
    const [err, setErr] = useState({type:"", msg:"", in:1});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const scrollDown = (e) => {
        e.preventDefault();
        window.scrollBy({top:window.innerHeight});
    }
    const scrollUp = (e) => {
        e.preventDefault();
        window.scrollBy({top:-window.innerHeight});
    }

    useEffect(() => {
        const ref = localStorage.getItem("refToken");

        if(ref){
            login(ref);
            router.push("/user/exepenses");
        }
    }, [])

    const createUser = async (e) => {
        e.preventDefault();
        setErr({type:"", msg:"", in:1});
        if(firstn === "" || lastn === ""){
            setErr({type:"bio-name", msg:"Incomplete section", in:1});
            window.scrollTo({top:0});
            return;
        }
        if(usern === "" || email === ""){
            setErr({type:"profile", msg:"Incomplete section", in:1})
            window.scrollTo({top:window.innerHeight});
            return;
        }
        if(pass === "" || pass !== rePass){
            setErr({type:"pwd_err", msg:"Not a match", in:1})
            return;
        }
        setIsLoading(true);
        const res = await fetch("/api/v1/auth/register", {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                firstname:firstn,
                lastname:lastn,
                email:email,
                username:usern,
                password:pass,
            })
        })
        const data = await res.json();

        if(data.error){
            if(data.error.code === 11000){
                setIsLoading(false);
                setErr({type:"bio-name", msg:"Email already exists", in:2});
            }
            return;
        }
        if(data.password){
            return router.push("/login");
        }
        setErr({type:"bio-name", msg:"Something went wrong: Report to ADMIN!"});
        setIsLoading(false);
    }


    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            { 
            isLoading ? <Loader /> 
            :
            <>
            <div className={style.container}>
                <div className={style.formSpace} id="register-form-space">
                    <form action="/api/v1/login" method="post" onSubmit={(e) => e.preventDefault()}>
                        <div className={style.outterRim}>
                            <div className={style.formGrouping}>
                            {err.type === "bio-name" ? <div className="text-center"><span className="p-2 alert alert-danger">{err.msg}</span></div> : <></> }
                                <div className="my-3">
                                    <label htmlFor="firstname">Firstname</label>
                                    <input type="text" name="firstname" id="firstname" className="my-2 form-control" value={firstn} onChange={(e) => setFn(e.target.value)}  required/>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="lastname">Lastname</label>
                                    <input type="text" name="lastname" id="lastname" className="my-2 form-control" value={lastn} onChange={(e) => setLn(e.target.value)} required/>
                                </div>
                                <div className="text-center"><button className="btn btn-outline-dark text-white" onClick={(e) => scrollDown(e)}>Next</button></div>
                            </div>
                        </div>
                        <div className={style.outterRim} id="profile-info">
                            <div className={style.formGrouping}>
                            {err.type === "profile" ? <div className="text-center"><span className="p-2 alert alert-danger">{err.msg}</span></div> : <></> }
                                <div className="my-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="my-2 form-control" value={usern} onChange={(e) => setUn(e.target.value)} required/>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className="my-2 form-control" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                                </div>
                                <div className="text-center"><button className="btn btn-outline-dark text-white mx-2"onClick={(e) =>  scrollUp(e)}>Back</button><button onClick={(e) => scrollDown(e)} className="btn btn-outline-dark text-white mx-2">Next</button></div>
                            </div>
                        </div>
                        <div className={style.outterRim} id="create-password">
                            <div className={style.formGrouping}>
                            {err.type === "pwd_err" ? <div className="text-center"><span className="p-2 alert alert-danger">{err.msg}</span></div> : <></> }
                                <div className="my-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="my-2 form-control" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="password">Confirm Password</label>
                                    <input type="password" name="re-password" id="re-password" className="my-2 form-control" value={rePass} onChange={(e) => setRePass(e.target.value)} required/>
                                </div>
                                <div className="text-center"><button className="btn btn-outline-dark text-white mx-2" onClick={(e) => scrollUp(e)}>Back</button> <input type="submit" value="Submit" className="btn btn-dark text-center" onClick={(e) => createUser(e)}/></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
            </>
            }
        </>
    )
}