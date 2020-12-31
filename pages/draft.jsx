import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Draft() {
    const draftList = [];
    return (
        <div className="container">
            <Head>
                <title>Draft</title>
            </Head>

            <main className="main">
                <h1 className={styles.title}>The Snacket Draft</h1>
            </main>
        </div>
    );
}
