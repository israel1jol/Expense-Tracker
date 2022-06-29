import { Html, Main, Head, NextScript } from "next/document";

export default function MyDocument(){
    return (
        <Html>
            <Head>
            <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charSet="utf-8" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}