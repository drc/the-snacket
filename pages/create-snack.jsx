import { useState } from "react";
import Head from "next/head";
import styles from "../styles/CreateSnack.module.css";
import { server } from "../config";
import useSWR from "swr";

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

    return (
        <div className="container">
            <Head>
                <title>Add a Snack</title>
            </Head>

            <main className="main">
                <h1 className={styles.title}>Add a Snack</h1>
                {loading ? (
                    <div>Adding...</div>
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
                        {name && category && <button className={styles.button} onClick={submit}>
                            Add
                        </button>}
                    </form>
                )}
                {data ? (
                    <table className={styles.table}>
                        <thead className={styles.th}>
                            <tr className={styles.tr}>
                                <th>Name</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.results
                                .sort((a, b) => {
                                    const nameA = a.name.toUpperCase();
                                    const nameB = b.name.toUpperCase();
                                    if (nameA < nameB) return -1;
                                    if (nameA > nameB) return 1;
                                    return 0;
                                })
                                .map(snack => {
                                    return (
                                        <tr
                                            className={styles.tr}
                                            key={snack._id}>
                                            <td>{snack.name}</td>
                                            <td>
                                                {
                                                    categories.results.find(
                                                        cat =>
                                                            cat._id ===
                                                            snack.category
                                                    ).name
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                ) : (
                    ""
                )}
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
