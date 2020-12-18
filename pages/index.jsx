import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to The Snacket</h1>

                <p className={styles.description}></p>

                <div className={styles.grid}>
                    <Link href="/draft">
                        <a
                            className={`${styles.card} ${
                                new Date().getTime() < 1608325680000
                                    ? styles.disabled
                                    : ""
                            }`}>
                            <h3>Draft &rarr;</h3>
                            <p>Pick the seed order for the snacks.</p>
                        </a>
                    </Link>

                    <Link href="/bracket">
                        <a className={styles.card}>
                            <h3>Bracket &rarr;</h3>
                            <p>See the current bracket!</p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    );
}
