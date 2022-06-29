import Head from "next/head";
import style from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import frame1 from "../public/images/cd-frame1-edit.png";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import frame2 from "../public/images/cd-frame3-edit.png";

export default function Home(){
    const { auth } = useContext(AuthContext);
    return (
        <div>
            <Head>
                <title>Card Tracker</title>
            </Head>
            <div className={style.container}>
                <div className={style.containerScene}>
                    <article className={style.header}>
                        <section id="balance-transactions">
                            <h1>Balance your transactions.</h1>
                            <p className="lead">Manage your budget today. With Card Tracker you now have the ability to keep track of your savings and income with the click of a button.</p>
                        </section>
                        <div className={style.boundary}><Image src={frame2} alt="Two people"/></div>
                    </article>
                    <article className={style.header}>
                        <section id="check-transactions">
                            <div className={style.boundary}><Image src={frame1} alt="Two people"/></div>
                            <div>
                                <h2>Lowkey The Right App for You.</h2>
                                <p className="lead">Save Up for your next trip to the mall. Find better black friday deals. A simple calculator for your most basic money needs. { auth.isAuthenticated ? "" : "Join Now." }</p>

                                <div className="w-45 mx-auto d-flex justify-content-center">{auth.isAuthenticated ? <Link href="/user"><a className="btn btn-outline-light">View Profile</a></Link> : <Link href="/register"><a className="btn btn-outline-light">Join Now</a></Link>}</div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}
