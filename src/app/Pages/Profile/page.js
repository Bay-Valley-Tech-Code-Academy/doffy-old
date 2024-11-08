// src/app/Pages/Profile/page.js

"use client";

import Image from 'next/image';
import styles from './Profile.module.css'; // Example for styling
import { useState } from 'react';

const ProfilePage = () => {
    const [showResumeBuilder, setShowResumeBuilder] = useState(false);
    const [showResumeAll, setShowResumeAll] = useState(false);

    const toggleResumeBuilder = () => setShowResumeBuilder(!showResumeBuilder);
    const toggleResumeAll = () => setShowResumeAll(!showResumeAll);

    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                {/* You can replace this with a Next.js Image component */}
                <div className={styles.profilePhoto}>
                    <p> Profile Picture
                        Placeholder
                    </p>
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
                </div>
                <button onClick={toggleResumeAll} className={styles.toggleButton}>
                    {showResumeAll ? 'Hide More Resumes' : 'Show More Resumes'}
                </button>
                {showResumeAll && (
                    <div className={styles.resumeAll}>
                        <div className={styles.section}>
                            <h3>Additional Resumes</h3>
                            <div className={styles.resumeFiles}>
                                <h4 className={styles.resumeFile}>Resume_File_4.pdf</h4>
                                <h4 className={styles.resumeFile}>Resume_File_5.pdf</h4>
                                <h4 className={styles.resumeFile}>Resume_File_6.pdf</h4>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={toggleResumeBuilder} className={styles.toggleButton}>
                    {showResumeBuilder ? 'Hide Resume Builder' : 'Show Resume Builder'}
                </button>
                {showResumeBuilder && (
                    <div className={styles.resumeBuilder}>
                        <h3>Resume Builder</h3>
                        {/* Summary Section */}
                        <div className={styles.section}>
                            <h4>Summary</h4>
                            <textarea maxLength="600" placeholder="Enter a brief summary..." />
                        </div>

                        {/* Work Experience Section */}
                        <div className={styles.section}>
                            <h4>Work Experience</h4>
                            <input type="text" placeholder="Job Title" />
                            <input type="text" placeholder="Company Name" />
                            <input type="text" placeholder="Location (Address or Remote)" />
                            <input type="text" placeholder="City" />
                            <input type="text" placeholder="Country" />
                            <input type="month" placeholder="From (Month & Year)" />
                            <input type="month" placeholder="To (Month & Year or Present)" />
                            <textarea placeholder="Job Description" />
                        </div>

                        {/* Education Section */}
                        <div className={styles.section}>
                            <h4>Education</h4>
                            <input type="text" placeholder="Level of Education" />
                            <input type="text" placeholder="Field of Study" />
                            <input type="text" placeholder="School Name" />
                            <input type="month" placeholder="From (Month & Year)" />
                            <input type="month" placeholder="To (Month & Year or Present)" />
                        </div>

                        {/* Skills Section */}
                        <div className={styles.section}>
                            <h4>Skills</h4>
                            <input type="text" placeholder="Skill Name" />
                            <input type="number" placeholder="Years of Experience" min="0" />
                        </div>

                        {/* Links Section */}
                        <div className={styles.section}>
                            <h4>Links</h4>
                            <input type="text" placeholder="Link Name" />
                            <input type="url" placeholder="Link URL" />
                        </div>

                        {/* Publications Section */}
                        <div className={styles.section}>
                            <h4>Publications</h4>
                            <input type="text" placeholder="Publication Name" />
                            <input type="url" placeholder="Publication URL" />
                            <input type="month" placeholder="Published Date (Month & Year)" />
                            <textarea maxLength="600" placeholder="Summary" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
