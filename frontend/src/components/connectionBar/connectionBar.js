"use client"

import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import styles from './connectionBar.module.scss'



const connectionBar = () => {
    useEffect(() => {
        async () => {
            const validatedCookie = await validateCookie()
            if (!validatedCookie) {
                redirect('/')
            }
            console.log('validated')
        }

    }, [])


    const validateCookie = async () => {
        try {
            const { data } = fetch('/api/auth/validate', {
                method: 'GET',
            })
            return true
        } catch (error) {
            redirect('/')
        }

    }

    return (
        <section className={styles.connectionBar}>
            <h2>Authenticated to ZPA!</h2>
        </section>
    )
}

export default connectionBar