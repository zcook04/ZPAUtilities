'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import PageSummary from '@/components/pagesummary/PageSummary'

const AccessPolicy = () => {
    return (
        <section className={styles.summarySection}>
            <PageSummary
                title='Access Policy Analyser'
                description="View, analyse and edit access policies for your application segments." />
        </section>
    )
}

export default AccessPolicy