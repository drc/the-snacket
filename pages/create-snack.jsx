import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/CreateSnack.module.css";
import { server } from "../config";
import useSWR from "swr";
import SnackTable from "../components/SnackTable";
import Header from "../components/Header";

export default function CreateSnack({ categories }) {
    const fetcher = url => fetch(url).then(r => r.json());
    const { data, error } = useSWR("/api/snacks", fetcher);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async e => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await fetch(`${server}/api/snacks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    category,
                }),
            });
            if (res.status === 200 || res.status === 201) {
                setLoading(false);
                const snack = await res.json();
                data.results.push(snack);
            } else {
                const message = await res.json();
                alert(message.error);
            }
            setName("");
            setCategory("");
        } catch (error) {
            alert(error);
        }
    };

    const afterNYE = (new Date().getTime() > 1609480800000);

    return (
        <div className="container">
            <Header title={afterNYE ? "Snack List" : "Add a Snack"} />
            <nav className={styles.nav}>
                <Link href="/">
                    <a>&larr; Home</a>
                </Link>
            </nav>
            <main className="main">
                <h1 className={styles.title}>
                    {afterNYE ? "Snack List" : "Add a Snack"}
                </h1>
                {loading ? (
                    <div>Adding...</div>
                ) : afterNYE ? (
                    ""
                ) : (
                    <form>
                        <label className={styles.label}>Snack Name: </label>
                        <input
                            required
                            className={styles.input}
                            placeholder="Doritos"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}></input>
                        <label className={styles.label}>Category: </label>
                        <select
                            required
                            className={styles.input}
                            value={category}
                            name="category"
                            id="category"
                            onChange={e => setCategory(e.target.value)}>
                            <option value="">-- Select a Category --</option>
                            {categories.results.map(cat => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {name && category && (
                            <button className={styles.button} onClick={submit}>
                                Add
                            </button>
                        )}
                    </form>
                )}
                <div className={styles.tableList}>
                    {data
                        ? categories.results.map((category, idx) => (
                              <SnackTable
                                  key={idx}
                                  data={data}
                                  filter={category}
                              />
                          ))
                        : ""}
                </div>
                {error ? "Error loading the table" : ""}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const catRes = await fetch(`${server}/api/categories`);
    const categories = await catRes.json();

    return {
        props: {
            categories,
        },
    };
}
