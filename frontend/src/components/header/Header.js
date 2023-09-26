'use client';

import React, { useEffect } from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify';



const Header = () => {
    const pathname = usePathname()
    const router = useRouter()

    async function signOut() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                router.push('/')
            }

            if (!response.ok) {
                console.log(data)
                toast.error("An error occured while trying to disconnect")
            }

        } catch (error) {
            console.error(error)
            toast.error("An error occured while trying to disconnect")
        }
    }

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
                if (!response.ok) {
                    router.push('/')
                }

            } catch (error) {
                console.error(error)
                router.push('/')
            }
        }
        validate()
    }, [])

    return (
        <header className={styles.header}>
            <h1>Zscaler Private Access Utilities</h1>
            <ul>
                <Link
                    href='/tools/bulk-add'
                    className={pathname === '/bulk-add' ? 'active' : ''}>
                    <li>Bulk Add</li>
                </Link>
                <Link
                    href='/tools/bulk-move'
                    className={pathname === '/bulk-move' ? 'active' : ''}>
                    <li>Bulk Move</li>
                </Link>
                <Link
                    href='/tools/bulk-move'
                    className={pathname === '/bulk-delete' ? 'active' : ''}>
                    <li>Bulk Delete</li>
                </Link>

                <li onClick={signOut}>Disconnect</li>

            </ul>
        </header>
    )
}

export default Header