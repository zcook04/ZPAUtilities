"use client"

import styles from './page.module.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
  })

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.loginWrapper}>

        <div className={styles.headerStyle}><h1>Authenticate To ZPA</h1></div>
        <div className={styles.formStyle}>
          <form onSubmit={onSubmit}>
            <input placeholder='Client ID' type='password' value={formData.clientId} onChange={e => setFormData({ ...formData, clientId: e.target.value })} name='clientId' className={styles.formInput} />
            <input placeholder='Client Secret' type='password' value={formData.clientSecret} onChange={e => setFormData({ ...formData, clientSecret: e.target.value })} name='clientSecret' className={styles.formInput} />
            <button type='submit' disabled={isLoading} className={styles.buttonStyle}>Login</button>
          </form>
        </div>
      </section>
    </main>
  )
}
