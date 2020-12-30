import styles from "../styles/CreateSnack.module.css";

export default function SnackTable({ data, categories, filter }) {
    return (
        <div className={styles.snackList}>
            <h3>{filter.name}</h3>
            {data.results
                .sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                })
                .filter(snack => snack.category === filter._id)
                .map(snack => {
                    return (
                        <div className={styles.card} key={snack._id}>
                            <div className={styles.cardName}>{snack.name}</div>
                            {/* <div className={styles.cardCategory}>
                                {
                                    categories.results.find(
                                        cat => cat._id === snack.category
                                    ).name
                                }
                            </div> */}
                        </div>
                    );
                })}
        </div>
    );
}
