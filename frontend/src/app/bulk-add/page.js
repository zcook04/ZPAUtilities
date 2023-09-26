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
            <p>Given a configured application segment this tool will add a list of applications to it up to 1000 at a time.  The applications must not already be configured in another application segment and should consist of FQDN's and valid IPv4 addresses only.</p>
            <p>Choose the application from the dropdown below then either paste or upload a text file containing the list of FQDN's and IPv4 addresses seperated by newlines.  An example of the expected input is shown in the text box below.</p>

            <select placeholder='Select An Application Segment' name='applicationSegment'>
                {appSegments.map(appSegment => <option key={appSegment.id} value={appSegment.id}>{appSegment.name}</option>
                )}
            </select>
        </section>
    )
}

export default BulkAddPage