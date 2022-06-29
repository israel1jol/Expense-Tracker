import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/layout";
import "../styles/app.scss";

export default function MyApp({Component, pageProps}){

    return (
        <Layout>
            <Component { ...pageProps }/>
        </Layout>
    )
}