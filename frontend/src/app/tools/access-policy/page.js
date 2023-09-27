'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import PageSummary from '@/components/pagesummary/PageSummary'
import AccessPolicyItem from '@/components/accessPolicyItem/AccessPolicyItem'

const AccessPolicy = () => {
    const [accessPolicy, setAccessPolicy] = useState([])

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

    return (
        <>
            <section className={styles.summarySection}>
                <PageSummary
                    title='Access Policy Analyser'
                    description="View and analyse access policies for your application segments." />
            </section>
            <section className={styles.policyViewerSection}>
                <h2>Access Policy</h2>
                {accessPolicy.list && accessPolicy.list.map(policy => <AccessPolicyItem key={policy.id} name={policy.name ? policy.name : ''} />)}
            </section>
        </>
    )
}

export default AccessPolicy