// src/app/Pages/Profile/page.js

import Image from 'next/image';
import styles from './Profile.module.css'; // Example for styling

const ProfilePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                {/* You can replace this with a Next.js Image component */}
                <div className={styles.profilePhoto}>
                <p>Profile Picture</p>
                </div>
                <div className={styles.profileInfo}>
                    <h1>John Doe</h1>
                    <p>Email: john.doe@example.com</p>
                    <p>Location: San Francisco, CA</p>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Recent Saved Job Postings</h2>
                <div className={styles.jobPostings}>
                    <div className={styles.card}>Posting 1</div>
                    <div className={styles.card}>Posting 2</div>
                    <div className={styles.card}>Posting 3</div>
                    <div className={styles.card}>Show All</div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Resumes</h2>
                <div className={styles.resumePortfolio}>
                    <div className={styles.card}>Resume File 1</div>
                    <div className={styles.card}>Resume File 2</div>
                    <div className={styles.card}>Resume File 3</div>
                    <div className={styles.card}>Show All</div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
