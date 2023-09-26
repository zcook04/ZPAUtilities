'use client'

import { toast } from 'react-toastify'
import PageSummary from '@/components/pagesummary/PageSummary'
import React, { useState, useEffect } from 'react'
import styles from './bulk-move.module.scss'

const BulkMovePage = () => {

    const [appSegments, setAppSegments] = useState([])
    const [selectedAppSegmentA, setSelectedAppSegmentA] = useState('')
    const [selectedAppSegmentB, setSelectedAppSegmentB] = useState('')
    const [applications, setApplications] = useState('')

    const submitHandler = async () => {
        //split applications into an array of strings
        const applicationArray = applications.split('\n')
        //remove empty strings from array
        const filteredApplicationArray = applicationArray.filter(application => application.length > 0)
        //remove duplicate FQDNs and IPv4 addresses from array
        const uniqueApplicationArray = [...new Set(filteredApplicationArray)]
        const response = await fetch(`/api/move-apps-between-segments`, {
            method: 'PUT',
            body: JSON.stringify({ "applications": uniqueApplicationArray, "applicationIdA": selectedAppSegmentA, "applicationIdB": selectedAppSegmentB })
        })

        if (response.ok) {
            toast.success('Applications moved successfully')
            setSelectedAppSegmentA('')
            setSelectedAppSegmentB('')
            setApplications('')
        } else {
            console.error(response)
            toast.error('An error occurred moving the applications.')
        }
    }

    // Get Application Segments
    useEffect(() => {
        const getAppSegments = async () => {
            try {
                const response = await fetch('/api/app-segments', {
                    method: 'GET'
                })
                if (response.ok) {
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
                title="Move Applications Between App Segments"
                description="Given two configured application segments and a list of applications to move, you can instlaly move applications between the application segments.  First select the application segment to move from, then select the application segment to move to.  Finally, paste in the list of applications to be transferred, seperating the applications with a newline." />
            <div className={styles.appSelection}>
                <h3>From Application Segment</h3>
                <h3>To Application Segment</h3>
                <select placeholder='Select An Application Segment' name='applicationSegment' onChange={(e) => setSelectedAppSegmentA(e.target.value)} value={selectedAppSegmentA}>
                    <option value=''>Select An Application Segment</option>
                    {appSegments.filter(appSegment => appSegment.id !== selectedAppSegmentB).map(appSegment => <option key={appSegment.id} value={appSegment.id}>{appSegment.name}</option>
                    )}
                </select>
                <select placeholder='Select An Application Segment' name='applicationSegment' onChange={(e) => setSelectedAppSegmentB(e.target.value)} value={selectedAppSegmentB}>
                    <option value=''>Select An Application Segment</option>
                    {appSegments.filter(appSegment => appSegment.id !== selectedAppSegmentA).map(appSegment => <option key={appSegment.id} value={appSegment.id}>{appSegment.name}</option>
                    )}
                </select>
            </div>
            <textarea placeholder='Paste FQDNs and IPv4 addresses here.  Seperate each entry with a newline.' name='applications' value={applications} onChange={e => setApplications(e.target.value)}></textarea>
            <div className={styles.button} onClick={submitHandler} >Delete Applications From Application Segment</div>
        </section>
    )
}

export default BulkMovePage