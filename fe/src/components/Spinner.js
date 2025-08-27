import React from "react";
import styles from "../styles/components/Spinner.module.css";

export default function Spinner({ overlay = true, label = "Loading..." }) {
    const content = (
        <div className={styles['spinner-wrap']} role="status" aria-live="polite" aria-busy="true">
            <div className={styles['spinner']} />
            {label && <div className={styles['spinner-label']}>{label}</div>}
        </div>
    );

    if (!overlay) return content;

    return (
        <div className={styles['spinner-overlay']}>
            {content}
        </div>
    );
}
