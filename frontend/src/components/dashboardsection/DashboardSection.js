'use client'

import Link from 'next/link'
import React from 'react'
import styles from './dashboardsection.module.scss'

const DashboardSection = ({ title, description, href }) => {
    return (
        <section className={styles.section}>
            <Link href={href} className={styles.link}>
                <div className={styles.wrapper}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </Link>
        </section>


    )
}

export default DashboardSection