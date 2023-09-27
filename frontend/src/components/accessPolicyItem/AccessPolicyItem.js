import React from 'react'
import styles from './accessPolicyItem.module.scss'

const AccessPolicyItem = ({ name, id, ruleOrder, priority }) => {
    return (
        <article className={styles.wrapper}>
            <p>{ruleOrder}</p>
            <p>{priority}</p>
            <p>{name}</p>
        </article>
    )
}

export default AccessPolicyItem