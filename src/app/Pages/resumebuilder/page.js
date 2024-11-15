// src/app/Pages/resumebuilder/page.js

"use client";

import styles from './resumebuilder.module.css';
import { useState } from 'react';

const ResumeBuilder = () => {

    // State to manage dynamic fields in Education and Work Experience
    const [personalInfoFields, setPersonalInfoFields] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
    });
    const [linksFields, setLinksFields] = useState([]);
    const [educationFields, setEducationFields] = useState([]);
    const [workExperienceFields, setWorkExperienceFields] = useState([]);
    const [skillsFields, setSkillsFields] = useState([]);

    // Function to add new fields to various sections
    const addField = (section) => {
        if (section == "links") {
            setLinksFields([...linksFields, { linkType: "", linkURL: "" }]);
        } else if (section === "education") {
            setEducationFields([...educationFields, { school: "", degree: "", from: "", to: "" }]);
        } else if (section === "work") {
            setWorkExperienceFields([...workExperienceFields, { jobTitle: "", company: "", from: "", to: "" }]);
        } else if (section === "skills") {
            setSkillsFields([...skillsFields, { skill: "", describeSkill: "" }]);
        }
    };

    // Function to remove a field from various sections
    const removeField = (section, index) => {
        if (section == "links") {
            setLinksFields(linksFields.filter((_, i) => i !== index));
        } else if (section === "education") {
            setEducationFields(educationFields.filter((_, i) => i !== index));
        } else if (section === "work") {
            setWorkExperienceFields(workExperienceFields.filter((_, i) => i !== index));
        } else if (section === "skills") {
            setSkillsFields(skillsFields.filter((_, i) => i !== index));
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

            {/* Resume Builder */}
            <div className={styles.container}>
                <div className={styles.dynamicFieldsSection}>
                    <div className={styles.section}>
                        <h2>Resume Porfolio</h2>
                    </div>

                    {/* Personal Information Section */}
                    <div className={styles.section}>
                        <h2>Personal Information</h2>
                        <div className={styles.fieldGroup}>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={personalInfoFields.firstname || ""}
                                onChange={(e) => {
                                    setPersonalInfoFields({
                                        ...personalInfoFields,
                                        firstname: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Middle Name"
                                value={personalInfoFields.middlename || ""}
                                onChange={(e) => {
                                    setPersonalInfoFields({
                                        ...personalInfoFields,
                                        middlename: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={personalInfoFields.lastname || ""}
                                onChange={(e) => {
                                    setPersonalInfoFields({
                                        ...personalInfoFields,
                                        lastname: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Email Address"
                                value={personalInfoFields.email || ""}
                                onChange={(e) => {
                                    setPersonalInfoFields({
                                        ...personalInfoFields,
                                        email: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Links Section */}
                    <div className={styles.section}>
                        <h2>Links</h2>
                        {linksFields.map((field, index) => (
                            <div key={index} className={styles.fieldGroup}>
                                <input
                                    type="text"
                                    placeholder="Link Type"
                                    value={field.linkType}
                                    onChange={(e) => {
                                        const updatedFields = [...linksFields];
                                        updatedFields[index].linkType = e.target.value;
                                        setLinksFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Link URL"
                                    value={field.linkURL}
                                    onChange={(e) => {
                                        const updatedFields = [...linksFields];
                                        updatedFields[index].linkURL = e.target.value;
                                        setLinksFields(updatedFields);
                                    }}
                                />
                                <button onClick={() => removeField("links", index)}>Remove</button>
                            </div>
                        ))}
                        <button className={styles.card} onClick={() => addField("links")}>Add Link</button>
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

                    {/* Skills Section */}
                    <div className={styles.section}>
                        <h2>Skills</h2>
                        {skillsFields.map((field, index) => (
                            <div key={index} className={styles.fieldGroup}>
                                <input
                                    type="text"
                                    placeholder="Skill Name"
                                    value={field.skill}
                                    onChange={(e) => {
                                        const updatedFields = [...skillsFields];
                                        updatedFields[index].skill = e.target.value;
                                        setSkillsFields(updatedFields);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Description of Skill"
                                    value={field.describeSkill}
                                    onChange={(e) => {
                                        const updatedFields = [...skillsFields];
                                        updatedFields[index].describeSkill = e.target.value;
                                        setSkillsFields(updatedFields);
                                    }}
                                />
                                <button onClick={() => removeField("skills", index)}>Remove</button>
                            </div>
                        ))}
                        <button className={styles.card} onClick={() => addField("skills")}>Add Work Experience</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;