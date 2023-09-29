'use client'

import React, { useEffect, useState } from 'react'

import styles from './page.module.scss'
import { APP_CLIENT_INTERNALS } from 'next/dist/shared/lib/constants'

const TotalApplicationsPage = () => {
    const [appSegments, setAppSegments] = useState([])

    useEffect(() => {
        const getAppSegments = async () => {
            try {
                const response = await fetch('/api/app-segments', {
                    method: 'GET'
                })
                if (response.status === 200) {
                    const data = await response.json()
                    setAppSegments(data.appSegments)
                }

            } catch (error) {
                console.error(error)
            }

        }

        getAppSegments()
    }, [])

    const countApplicationsInSegments = (segments) => {
        let count = 0
        segments.forEach(appSegment => {
            count += appSegment.domainNames.length
        })
        return count
    }

    return (
        <section className={styles.totalApplicationsSection}>
            <article>
                <h3>Application Segments</h3>
                <p>{appSegments.length}</p>
            </article>
            <article>
                <h3>Total Application Count</h3>
                <p>{countApplicationsInSegments(appSegments)}</p>
            </article>
        </section>
    )
}

export default TotalApplicationsPage