import { useReducer, createContext } from "react";
import reducer from "./AuthReducer";

const _auth = {
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    token:"",
    profilePic:"",
    isAuthenticated:false
}

export const AuthContext = createContext(_auth);

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, _auth);

    const loginUser = (payload) => {
        dispatch({type:"login_user", payload:payload});
    }

    const logoutUser = () => {
        dispatch({type:"logout_user"});
    }
    return (
        <AuthContext.Provider value={{auth:state, login:loginUser, logoutUser:logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}
