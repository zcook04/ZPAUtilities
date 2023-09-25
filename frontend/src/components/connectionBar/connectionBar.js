"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './connectionBar.module.scss'

const connectionBar = () => {
    const [connected, setConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const validate = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('/api/auth/validate', {
                    method: 'POST',
                    body: JSON.stringify(),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const data = await response.json()
                if (data.status !== 200) {
                    router.push('/')
                }

            } catch (error) {
                console.error(error)
                router.push('/')
            } finally {
                setIsLoading(false)
            }
        }
        validate()
    }, [setConnected])

    return (
        <section className={styles.connectionBar}>
            <h2>Authenticated to ZPA!</h2>
        </section>
    )
}

export default connectionBar