// src/app/Pages/Profile/page.js

"use client";

import Image from 'next/image';
import styles from './Profile.module.css';
import { useState } from 'react';

const ProfilePage = () => {
    const [showResumeAll, setShowResumeAll] = useState(false);
    const [showPostingAll, setShowPostingAll] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);

    const [showResumeBuilder, setShowResumeBuilder] = useState(false);
    const toggleResumeBuilder = () => setShowResumeBuilder(!showResumeBuilder);

    const toggleResumeAll = () => setShowResumeAll(!showResumeAll);
    const togglePostingAll = () => setShowPostingAll(!showPostingAll);

    const openPopup = (resume) => {
        setSelectedResume(resume);
        setShowPopup(true);
    };

    const closePopup = () => setShowPopup(false);

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
                </div>
            </div>
            <button onClick={togglePostingAll} className={styles.toggleButton}>
                {showPostingAll ? 'Hide All Postings' : 'Show All Postings'}
            </button>
            {showPostingAll && (
                <div className={styles.expandedSection}>
                    <div className={styles.section}>
                        <div className={styles.expandAll}>
                            <h4>Posting 4</h4>
                            <h4>Posting 5</h4>
                            <h4>Posting 6</h4>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.section}>
                <h2>Resumes</h2>
                <div className={styles.resumePortfolio}>
                    <div onClick={() => openPopup('Resume_File_1.pdf')} className={styles.resumeCard}>Resume_File_1.pdf</div>
                    <div onClick={() => openPopup('Resume_File_2.pdf')} className={styles.resumeCard}>Resume_File_2.pdf</div>
                    <div onClick={() => openPopup('Resume_File_3.pdf')} className={styles.resumeCard}>Resume_File_3.pdf</div>
                </div>
                <button onClick={toggleResumeAll} className={styles.toggleButton}>
                    {showResumeAll ? 'Hide All Resumes' : 'Show All Resumes'}
                </button>
                {showResumeAll && (
                    <div className={styles.expandedSection}>
                        <div className={styles.expandAll}>
                            <h4 onClick={() => openPopup('Resume_File_4.pdf')} className={styles.resumeFile}>Resume_File_4.pdf</h4>
                            <h4 onClick={() => openPopup('Resume_File_5.pdf')} className={styles.resumeFile}>Resume_File_5.pdf</h4>
                            <h4 onClick={() => openPopup('Resume_File_6.pdf')} className={styles.resumeFile}>Resume_File_6.pdf</h4>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.section}>
                <h2>Resume Builder</h2>
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

            {/* Popup overlay */}
            {showPopup && (
                <div className={styles.popupOverlay} onClick={closePopup}>
                    <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedResume}</h3>
                        <p>Placeholder for the PDF preview content.</p>
                        <button onClick={closePopup} className={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProfilePage;
