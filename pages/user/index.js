import Head from "next/head";
import Image from "next/image";
import { AuthContext } from "../../components/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import style from "../../styles/User.module.scss";

export default function User(){
    const { auth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const ref = localStorage.getItem("refToken");

        if(!ref){
            router.push("/404");
        }
    })

    return (
        <>
        <Head>
            <title>Profile</title>
        </Head>
        <div className={style.container}>
            <div >
                <div className={style.profilePic}><Image src="https://i.postimg.cc/pVDrmVBM/alexander-ant-s-Kh6b9-Had-YU-unsplash.jpg" width={250} height={250} alt="Profile picture"/></div>
                <div className="text-center">
                    <h2>{auth.firstname} {auth.lastname}</h2>
                    <h4>{auth.username}</h4>
                    <span>{auth.email}</span>
                </div>
            </div>
        </div>
        </>
    )
}


