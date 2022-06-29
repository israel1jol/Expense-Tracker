import cedit from "../public/CEdit.png";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Navbar.module.scss";
import { useState, useContext, useEffect } from "react";
import {AuthContext} from "./AuthContext";
import { userRefForAcc, useLogout } from "./Hooks";


const Navbar = () => {
    const [toggled, setToggled] = useState(false);
    const getUserAccess = userRefForAcc();
    const { auth } = useContext(AuthContext);
    const logout = useLogout();

    
    useEffect(() => {
        const ref = localStorage.getItem("refToken");

        if(ref){
            getUserAccess(ref);
        }
    }, [])

    const toggleMenu = () => {
        const rnv = document.getElementById("rnv");
        if(toggled){
            rnv.style.display = "none"
            setToggled(false);
        }
        else{
            rnv.style.display = "flex";
            setToggled(true);
        }
    }

    return (

        <div className={`d-flex justify-content-between align-items-center mx-3 ${style.container}`}>
            <div className="d-flex align-items-center">
                <Image src={cedit} width={40} height={40}/>
                <Link href="/">ard Tracker</Link>
            </div>
            <nav className={style.standardView}>
                <ul className="nav align-items-center">
                    <li className="nav-item mx-md-5 ">
                        {
                            !auth.isAuthenticated ? <Link href="/about"><a className={style.customLink}>About</a></Link> : <Link href="/user"><a className={style.customLink}>{auth.username}</a></Link>
                        }
                        
                    </li>
                    <li className="nav-item mx-md-5">
                        {
                            !auth.isAuthenticated ? <Link href="/login"><a className="btn btn-outline-light">Login</a></Link> : <Link href="/user/expenses"><a className={style.customLink}>Expenses</a></Link>
                        }
                    </li>
                    <li className=" nav-item mx-md-5">
                        {
                            !auth.isAuthenticated ? <Link href="/register"><a className="btn btn-outline-light">Register</a></Link> : <button className="btn btn-outline-light" onClick={logout}>LOGOUT</button>
                        }
                    </li>
                </ul>
            </nav>
            <div className={style.responsiveView}>
                <div className={style.menuBar} id="rnv-bar" onClick={toggleMenu}><span></span></div>
                <nav className={style.responsiveNav} id="rnv">
                    <ul>
                        <li>
                            {
                                !auth.isAuthenticated ? <Link href="/about"><a className={style.customLink}>About</a></Link> : <Link href="/user"><a className={style.customLink}>{auth.username}</a></Link>
                            }
                            
                        </li>
                        <li>
                            {
                                !auth.isAuthenticated ?  <Link href="/login"><a className={style.customLink}>Login</a></Link> :  <Link href="/user/expenses"><a className={style.customLink}>Expenses</a></Link>
                            }
                        </li>
                        <li>
                            {
                                !auth.isAuthenticated ? <Link href="/register"><a className={style.customLink}>Register</a></Link> : <Link href="/logout"><a className={style.customLink}>Logout</a></Link>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;