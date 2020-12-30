import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>The Snacket - 2021</title>
                <meta
                    name="description"
                    content="Determining the top snack in 2021."
                />

                <meta
                    property="og:url"
                    content="https://the-snacket.herokuapp.com/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="The Snacket - 2021" />
                <meta
                    property="og:description"
                    content="Determining the top snack in 2021."
                />
                <meta
                    property="og:image"
                    content="https://static.onecms.io/wp-content/uploads/sites/35/2018/01/03222555/wide-puffed-snacks-bags.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:domain"
                    content="the-snacket.herokuapp.com"
                />
                <meta
                    property="twitter:url"
                    content="https://the-snacket.herokuapp.com/"
                />
                <meta name="twitter:title" content="The Snacket - 2021" />
                <meta
                    name="twitter:description"
                    content="Determining the top snack in 2021."
                />
                <meta
                    name="twitter:image"
                    content="https://static.onecms.io/wp-content/uploads/sites/35/2018/01/03222555/wide-puffed-snacks-bags.jpg"
                />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to The Snacket</h1>

                <p className={styles.description}></p>

                <div className={styles.grid}>
                    <Link href="/draft">
                        <a
                            className={`${styles.card} ${
                                new Date().getTime() < 1609480800000
                                    ? styles.disabled
                                    : ""
                            }`}>
                            <h3>Draft &rarr;</h3>
                            <p>Pick the seed order for the snacks.</p>
                        </a>
                    </Link>

                    <Link href="/bracket">
                        <a
                            className={`${styles.card} ${
                                new Date().getTime() < 1609480800000
                                    ? styles.disabled
                                    : ""
                            }`}>
                            <h3>Bracket &rarr;</h3>
                            <p>See the current bracket!</p>
                        </a>
                    </Link>

                    <Link href="/create-snack">
                        <a
                            className={`${styles.card} ${
                                new Date().getTime() > 1609480800000
                                    ? styles.disabled
                                    : ""
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
