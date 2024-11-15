// src/app/Pages/resumebuilder/page.js

"use client";

import styles from './resumebuilder.module.css';
import { useState } from 'react';

const ResumeBuilder = () => {

    // State to manage dynamic fields in Education and Work Experience
    const [educationFields, setEducationFields] = useState([]);
    const [workExperienceFields, setWorkExperienceFields] = useState([]);

    // Function to add new fields to Education or Work Experience
    const addField = (section) => {
        if (section === "education") {
            setEducationFields([...educationFields, { school: "", degree: "", from: "", to: "" }]);
        } else if (section === "work") {
            setWorkExperienceFields([...workExperienceFields, { jobTitle: "", company: "", from: "", to: "" }]);
        }
    };

    // Function to remove a field from Education or Work Experience
    const removeField = (section, index) => {
        if (section === "education") {
            setEducationFields(educationFields.filter((_, i) => i !== index));
        } else if (section === "work") {
            setWorkExperienceFields(workExperienceFields.filter((_, i) => i !== index));
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h2>Build My Resume!</h2>
                    <div className={styles.card}>
                        <p>Follow the steps below to create your resume:</p>
                        <ul>
                            <li>Add your personal information</li>
                            <li>Enter your work experience</li>
                            <li>Provide your education background</li>
                            <li>List your skills and certifications</li>
                            <li>Save or export your resume</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Dynamic Fields Section - Outside and Below the Container */}
            <div className={styles.container}>
                <div className={styles.dynamicFieldsSection}>
                    <div className={styles.section}>
                    <h2>Resume Details</h2>
                    </div>
                    {/* Education Section */}
                    <div className={styles.section}>
                        <h2>Education</h2>
                        {educationFields.map((field, index) => (
                            <div key={index} className={styles.fieldGroup}>
                                <input
                                    type="text"
                                    placeholder="School Name"
                                    value={field.school}
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].school = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={field.degree}
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].degree = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="month"
                                    placeholder="From"
                                    value={field.from}
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].from = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="month"
                                    placeholder="To"
                                    value={field.to}
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].to = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <button onClick={() => removeField("education", index)}>Remove</button>
                            </div>
                        ))}
                        <button className={styles.card} onClick={() => addField("education")}>Add Education</button>
                    </div>

                    {/* Work Experience Section */}
                    <div className={styles.section}>
                        <h2>Work Experience</h2>
                        {workExperienceFields.map((field, index) => (
                            <div key={index} className={styles.fieldGroup}>
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    value={field.jobTitle}
                                    onChange={(e) => {
                                        const updatedFields = [...workExperienceFields];
                                        updatedFields[index].jobTitle = e.target.value;
                                        setWorkExperienceFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={field.company}
                                    onChange={(e) => {
                                        const updatedFields = [...workExperienceFields];
                                        updatedFields[index].company = e.target.value;
                                        setWorkExperienceFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="month"
                                    placeholder="From"
                                    value={field.from}
                                    onChange={(e) => {
                                        const updatedFields = [...workExperienceFields];
                                        updatedFields[index].from = e.target.value;
                                        setWorkExperienceFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="month"
                                    placeholder="To"
                                    value={field.to}
                                    onChange={(e) => {
                                        const updatedFields = [...workExperienceFields];
                                        updatedFields[index].to = e.target.value;
                                        setWorkExperienceFields(updatedFields);
                                    }}
                                />
                                <button onClick={() => removeField("work", index)}>Remove</button>
                            </div>
                        ))}
                        <button className={styles.card} onClick={() => addField("work")}>Add Work Experience</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;