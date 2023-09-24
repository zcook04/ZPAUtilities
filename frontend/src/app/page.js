import styles from './page.module.scss'

export default function Home() {

  async onSubmit => {

  }

  return (
    <main className={styles.main}>
      <section className={styles.loginWrapper}>

        <div className={styles.headerStyle}><h1>Authenticate To ZPA</h1></div>
        <div className={styles.formStyle}>
          <form>
            <input placeholder='Customer ID' type='text' name='customerId' className={styles.formInput} />
            <input placeholder='Client ID' type='password' name='clientId' className={styles.formInput} />
            <input placeholder='Client Secret' type='password' name='clientId' className={styles.formInput} />
            <button type='submit' className={styles.buttonStyle}>Login</button>
          </form>
        </div>
      </section>
    </main>
  )
}
