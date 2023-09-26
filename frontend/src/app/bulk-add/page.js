'use client'

import React, { useEffect, useState } from 'react'
import styles from './bulk-add.module.scss'

const BulkAddPage = () => {
    const [appSegments, setAppSegments] = useState([]);

    useEffect(() => {
        const getAppSegments = async () => {
            try {
                const response = await fetch('/api/app-segments', {
                    method: 'GET'
                })
                if (response.status === 200) {
                    const data = await response.json()
                    setAppSegments(data.appSegments.list)
                }

            } catch (error) {
                console.error(error)
            }

        }

        getAppSegments()
    }, [])

    return (
        <section className={styles.summarySection}>
            <h2>Add Bulk Applications</h2>
            <p>When provided with a configured application segment, this tool can efficiently append a list of up to 1000 applications to it. These applications should meet the following criteria: they must not be already configured within another application segment, and they should exclusively comprise Fully Qualified Domain Names (FQDNs) and valid IPv4 addresses.</p>
            <p>To proceed, please select the desired application from the dropdown menu below, and then either paste the list of FQDNs and IPv4 addresses, separated by newlines, or upload a text file containing this information. An illustrative example of the expected input format is displayed in the text box below for reference.</p>

            <select placeholder='Select An Application Segment' name='applicationSegment'>
                {appSegments.map(appSegment => <option key={appSegment.id} value={appSegment.id}>{appSegment.name}</option>
                )}
            </select>
        </section>
    )
}

export default BulkAddPage