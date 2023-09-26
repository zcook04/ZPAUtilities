'use client'

import React, { useState, useEffect } from 'react'
import styles from './bulk-delete.module.scss'
import PageSummary from '@/components/pagesummary/PageSummary'

const BulkDeletePage = () => {
    const [appSegments, setAppSegments] = useState([]);
    const [selectedAppSegment, setSelectedAppSegment] = useState('');
    const [applications, setApplications] = useState([]);

    const submitHandler = async () => {
        //split applications into an array of strings
        const applicationArray = applications.split('\n')
        //remove empty strings from array
        const filteredApplicationArray = applicationArray.filter(application => application.length > 0)
        //remove duplicate FQDNs and IPv4 addresses from array
        const uniqueApplicationArray = [...new Set(filteredApplicationArray)]
        const response = await fetch(`/api/update-app-segment`, {
            method: 'DELETE',
            body: JSON.stringify({ "applications": uniqueApplicationArray, "applicationId": selectedAppSegment })
        })

        if (response.ok) {
            toast.success('Applications deleted successfully')
            setSelectedAppSegment('')
            setApplications([])
        } else {
            toast.error('An error occurred deleting the applications.')
        }
    }

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

    return (
        <section className={styles.summarySection}>
            <PageSummary
                title="Bulk Delete Applications"
                description="Given a configured application segment and a list of applications to delete, you can bulk delete applications from the application segment.  First select the application segment to delete from, then paste in the list of applications to be deleted, seperating the applications with a newline." />

            <select placeholder='Select An Application Segment' name='applicationSegment' onChange={(e) => setSelectedAppSegment(e.target.value)} value={selectedAppSegment}>
                <option value=''>Select An Application Segment</option>
                {appSegments.map(appSegment => <option key={appSegment.id} value={appSegment.id}>{appSegment.name}</option>
                )}
            </select>
            <textarea placeholder='Paste FQDNs and IPv4 addresses here.  Seperate each entry with a newline.' name='applications' value={applications} onChange={e => setApplications(e.target.value)}></textarea>
            <div className={styles.button} onClick={submitHandler} >Delete Applications From Application Segment</div>
        </section>
    )
}

export default BulkDeletePage