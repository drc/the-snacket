import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Bracket() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Bracket</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>The Snacket Bracket</h1>
            </main>
        </div>
    );
}
