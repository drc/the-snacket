import Header from "../components/Header";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    const beforeNYD = new Date().getTime() < 1609480800000;
    const afterNYE = new Date().getTime() > 1609480800000;

    return (
        <div className={styles.container}>
            <Header
                title="The Snacket - 2021"
                description="Determining the top snack throughout 2021"
            />

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to The Snacket</h1>

                <p className={styles.description}></p>

                <div className={styles.grid}>
                    <Link href="/draft">
                        <a
                            className={`${styles.card} ${
                                beforeNYD ? styles.disabled : ""
                            }`}>
                            <h3>Draft &rarr;</h3>
                            <p>Pick the seed order for the snacks.</p>
                        </a>
                    </Link>

                    <Link href="/bracket">
                        <a
                            className={`${styles.card} ${
                                beforeNYD ? styles.disabled : ""
                            }`}>
                            <h3>Bracket &rarr;</h3>
                            <p>See the current bracket!</p>
                        </a>
                    </Link>

                    <Link href="/create-snack">
                        <a
                            className={`${styles.card} ${
                                afterNYE ? styles.disabled : ""
                            }`}>
                            <h3>Add Snacks &rarr;</h3>
                            <p>
                                See the current snack list and add more for the
                                draft!
                            </p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    );
}
