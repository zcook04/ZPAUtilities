'use client'

import React, { useEffect, useState } from 'react'
import styles from './bulk-add.module.scss'
import { toast } from 'react-toastify';

const BulkAddPage = () => {
    const [appSegments, setAppSegments] = useState([]);
    const [selectedAppSegment, setSelectedAppSegment] = useState('');
    const [applications, setApplications] = useState([]);

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

    const submitHandler = async () => {
        //split applications into an array of strings
        const applicationArray = applications.split('\n')
        //remove empty strings from array
        const filteredApplicationArray = applicationArray.filter(application => application.length > 0)
        //remove duplicate FQDNs and IPv4 addresses from array
        const uniqueApplicationArray = [...new Set(filteredApplicationArray)]
        const response = await fetch(`/api/update-app-segment`, {
            method: 'PUT',
            body: JSON.stringify({ "applications": uniqueApplicationArray, "applicationId": selectedAppSegment })
        })

        if (response.ok) {
            toast.success('Applications added successfully')
            setSelectedAppSegment('')
            setApplications([])
        } else {
            toast.error('An error occurred adding the applications.')
        }
    }



    return (
        <section className={styles.summarySection}>
            <h2>Add Bulk Applications</h2>
            <p>When provided with a configured application segment, this tool can efficiently append a list of up to 1000 applications to it. These applications should meet the following criteria: they must not be already configured within another application segment, and they should exclusively comprise Fully Qualified Domain Names (FQDNs) and valid IPv4 addresses.</p>
            <p>To proceed, please select the desired application from the dropdown menu below, and then paste the list of FQDNs and IPv4 addresses, separated by newlines.</p>

            <select placeholder='Select An Application Segment' name='applicationSegment' onChange={(e) => setSelectedAppSegment(e.target.value)} value={selectedAppSegment}>
                <option value=''>Select An Application Segment</option>
                {appSegments.map(appSegment => <option key={appSegment.id} value={appSegment.id}>{appSegment.name}</option>
                )}
            </select>
            <textarea placeholder='Paste FQDNs and IPv4 addresses here.  Seperate each entry with a newline.' name='applications' value={applications} onChange={e => setApplications(e.target.value)}></textarea>
            <div className={styles.button} onClick={submitHandler} >Add Applications To Application Segment</div>
        </section >
    )
}

export default BulkAddPage