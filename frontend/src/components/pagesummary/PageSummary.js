import React from 'react'
import styles from './pagesummary.module.scss'



const PageSummary = ({ title, description }) => {
    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
        </>
    )
}

export default PageSummary