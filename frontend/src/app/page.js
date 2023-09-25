"use client"

import styles from './page.module.scss'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'




export default function Home() {
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    customerId: '',
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const validate = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/auth/validate', {
          method: 'POST',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        if (data.status === 200) {
          router.push('/dashboard')
        }

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    validate()
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (data.status !== 200) {
        toast.error('Invalid Credentials')
      }

      if (data.status === 200) {
        router.push('/dashboard')
        toast.success('Login Successful')
      }
    } catch (error) {
      toast.error('Invalid Credentials')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.loginWrapper}>
        <div className={styles.headerStyle}><h1>Authenticate To ZPA</h1></div>
        {!loading ? <div className={styles.formStyle}>
          <form onSubmit={onSubmit}>
            <input placeholder='Customer ID' type='text' value={formData.customerId} onChange={e => setFormData({ ...formData, customerId: e.target.value })} name='clientId' className={styles.formInput} />
            <input placeholder='Client ID' type='password' value={formData.clientId} onChange={e => setFormData({ ...formData, clientId: e.target.value })} name='clientId' className={styles.formInput} />
            <input placeholder='Client Secret' type='password' value={formData.clientSecret} onChange={e => setFormData({ ...formData, clientSecret: e.target.value })} name='clientSecret' className={styles.formInput} />
            <button type='submit' className={styles.buttonStyle}>Login</button>
          </form>
        </div> :
          <h3>Authenticating, Please Wait...</h3>}
      </section>
    </main>
  )
}
