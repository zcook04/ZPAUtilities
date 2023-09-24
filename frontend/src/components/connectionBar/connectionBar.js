import React from 'react'
import styles from './connectionBar.module.scss'



const connectionBar = () => {
    return (
        <section className={styles.connectionBar}>
            <h2>Authenticated to ZPA!</h2>
        </section>
    )
}

export default connectionBar