import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Draft() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Draft</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>The Snacket Draft</h1>
            </main>
        </div>
    );
}
