'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import PageSummary from '@/components/pagesummary/PageSummary'

const AccessPolicy = () => {
    const [accessPolicy, setAccessPolicy] = useState({})

    useEffect(() => {
        const getAccessPolicy = async () => {
            try {
                const response = await fetch('/api/access-policy', {
                    method: 'GET'
                })
                if (response.ok) {
                    const data = await response.json()
                    setAccessPolicy(data.accessPolicy)
                }

            } catch (error) {
                console.error(error)
            }
        }
        getAccessPolicy()
    }, [])

    console.log(accessPolicy)


    return (
        <>
            <section className={styles.summarySection}>
                <PageSummary
                    title='Access Policy Analyser'
                    description="View and analyse access policies for your application segments." />
            </section>
            <section className={styles.policyViewerSection}>
                <h2>Access Policy</h2>
            </section>
        </>
    )
}

export default AccessPolicy