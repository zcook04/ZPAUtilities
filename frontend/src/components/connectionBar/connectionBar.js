"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './connectionBar.module.scss'
import { toast } from 'react-toastify'

const connectionBar = () => {
    const router = useRouter();

    useEffect(() => {
        const validate = async () => {
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
            }
        }
        validate()
    }, [])

    async function signOut() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()

            if (data.status === 200) {
                router.push('/')
            }

            if (data.status !== 200) {
                console.log(data)
                toast.error(data.msg)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className={styles.connectionBar} onClick={signOut}>
            <h2>Authenticated to Zscaler Private Access.  Click To Disconnect</h2>
        </section>
    )
}

export default connectionBar