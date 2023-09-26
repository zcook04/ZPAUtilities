import DashboardSection from '@/components/dashboardsection/DashboardSection'
import React from 'react'
import styles from './dashboard.module.scss'



const Home = () => {
    return (
        <section className={styles.utilitiesSection}>
            <h2>Utility Descriptions</h2>
            <DashboardSection title="Bulk Add" href="/tools/bulk-add" description="Add applications in bulk, up to 1000 at a time, to a preconfigured application segment." />
            <DashboardSection title="Bulk Delete" href="/tools/bulk-add" description="Delete applications in bulk, up to 1000 at a time, from a preconfigured application segment." />
            <DashboardSection title="Bulk Move" href="/tools/bulk-add" description="Move applications in bulk, up to 1000 at a time, from a preconfigured application segment to another preconfigured application segment." />
        </section>
    )
}

export default Home