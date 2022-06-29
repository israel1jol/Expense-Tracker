import { AuthContext } from "./AuthContext";
import { ExpenseContext } from "./ExpenseContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const CLIENT_ROUTE_AUTH = "api/v1/auth";

export const userRefForAcc = () =>{
    const { login } = useContext(AuthContext);
    const logout = useLogout();

    return (async function(t){
        const res = await fetch(`/${CLIENT_ROUTE_AUTH}/accessToken`, {
            "method":"GET",
            "headers":{
                "authorization":`Bearer ${t}`
            }
        })
        const data = await res.json();
        if(data.error){
            return logout();
        }

        const user_res = await fetch(`/${CLIENT_ROUTE_AUTH}/user`, {
            "method":"POST",
            "headers":{
                "content-type":"application/json"
            },
            "body":JSON.stringify({
                token:data.accToken
            })
        })
        const user_info = await user_res.json();

        if(user_info.error){
            return logout();
        }
        login({
            id:user_info._id,
            firstname:user_info.firstname,
            lastname:user_info.lastname,
            username:user_info.username,
            email:user_info.email,
            token:data.accToken,
            profilePic:user_info.profilePic,
            isAuthenticated:true
        })
    })   
}

export const useLogout = () => {
    const router = useRouter();
    const {logoutUser} = useContext(AuthContext);
    const {clearAll } = useContext(ExpenseContext);
    return (() => {
        router.push("/")
        localStorage.removeItem("refToken")
        logoutUser()
        clearAll()
    })
}