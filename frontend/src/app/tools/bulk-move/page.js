import PageSummary from '@/components/pagesummary/PageSummary'
import React from 'react'
import styles from './bulk-move.module.scss'

const BulkMovePage = () => {
    return (
        <section className={styles.summarySection}>
            <PageSummary
                title="Move Applications Between App Segments"
                description="Given two configured application segments and a list of applications to move, you can instlaly move applications between the application segments.  First select the application segment to move from, then select the application segment to move to.  Finally, paste in the list of applications to be transferred, seperating the applications with a newline." />
        </section>
    )
}

export default BulkMovePage