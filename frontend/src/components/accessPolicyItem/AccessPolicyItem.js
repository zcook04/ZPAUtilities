import React from 'react'
import styles from './accessPolicyItem.module.scss'

const AccessPolicyItem = ({ name }) => {
    return (
        <article className={styles.wrapper}>
            {name}
        </article>
    )
}

export default AccessPolicyItem