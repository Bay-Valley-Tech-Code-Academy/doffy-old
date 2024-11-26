"use client";

import styles from './resumebuilder.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResumeBuilder = () => {

    const router = useRouter();

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

    const addField = (section) => {
        if (section == "links") {
            setLinksFields([...linksFields, { linkType: "", linkURL: "" }]);
        } else if (section === "education") {
            setEducationFields([...educationFields, { school: "", degree: "", degreeType: "", from: "", to: "" }]);
        } else if (section === "work") {
            setWorkExperienceFields([...workExperienceFields, { jobTitle: "", company: "", from: "", to: "" }]);
        } else if (section === "skills") {
            setSkillsFields([...skillsFields, { skill: "", level: "", describeSkill: "" }]);
        }
    };

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

    const generateResumeJson = () => {
        const resumeData = {
            basics: {
                name: `${personalInfoFields.firstname} ${personalInfoFields.middlename} ${personalInfoFields.lastname}`,
                email: personalInfoFields.email,
                profiles: linksFields.map(link => ({
                    network: link.linkType,
                    url: link.linkURL,
                })),
            },
            work: workExperienceFields.map(work => ({
                name: work.company,
                position: work.jobTitle,
                startDate: work.from,
                endDate: work.to,
            })),
            education: educationFields.map(edu => ({
                institution: edu.school,
                area: edu.degree,
                studyType: edu.degreeType,
                startDate: edu.from,
                endDate: edu.to,
            })),
            skills: skillsFields.map(skill => ({
                name: skill.skill,
                level: skill.level,
                keywords: skill.describeSkill.split(", "),
            })),
        };

        return resumeData;
    };

    const exportResumeAsPDF = (resumeData) => {
        axios.post('http://localhost:3000/generate-resume', resumeData, { responseType: 'arraybuffer' })
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resume.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error exporting resume as PDF:', error);
            });

    };

    return (
        <div>
            <div className={styles.container}>
                <button
                    className={styles.button}
                    onClick={() => router.push('/Pages/profile')}
                >
                    Go to Profile Page
                </button>
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
                                className={styles.fieldInput}
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
                                className={styles.fieldInput}
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
                                className={styles.fieldInput}
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
                                className={styles.fieldInput}
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
                        <h2 className={styles.sectionTitle}>Links</h2>
                        {linksFields.map((field, index) => (
                            <div key={index} className={styles.fieldGroup}>
                                <input
                                    className={styles.fieldInput}
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
                                    className={styles.fieldInput}
                                    type="text"
                                    placeholder="Link URL"
                                    value={field.linkURL}
                                    onChange={(e) => {
                                        const updatedFields = [...linksFields];
                                        updatedFields[index].linkURL = e.target.value;
                                        setLinksFields(updatedFields);
                                    }}
                                />
                                <button
                                    className={styles.fieldButton}
                                    onClick={() => removeField("links", index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className={styles.button} onClick={() => addField("links")}>
                            Add Link
                        </button>
                    </div>


                    {/* Education Section */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Education</h2>
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
                                    type="text"
                                    placeholder="Associate's, Bachelor's, Master's"
                                    value={field.degreeType}
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].degreeType = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <input type="number" min="1980" max="2099" placeholder="From: 1980"
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].from = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <input type="number" min="1980" max="2099" placeholder="To: 2099"
                                    value={field.to}
                                    onChange={(e) => {
                                        const updatedFields = [...educationFields];
                                        updatedFields[index].to = e.target.value;
                                        setEducationFields(updatedFields);
                                    }}
                                />
                                <button className={styles.fieldButton} onClick={() => removeField("education", index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className={styles.button} onClick={() => addField("education")}>
                            Add Education
                        </button>
                    </div>

                    {/* Work Experience Section */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Work Experience</h2>
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
                                <button className={styles.fieldButton} onClick={() => removeField("work", index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className={styles.button} onClick={() => addField("work")}>
                            Add Work Experience
                        </button>
                    </div>

                    {/* Skills Section */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Skills</h2>
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
                                    placeholder="Beginner, Intermediate, Expert"
                                    value={field.level}
                                    onChange={(e) => {
                                        const updatedFields = [...skillsFields];
                                        updatedFields[index].level = e.target.value;
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
                                <button className={styles.fieldButton} onClick={() => removeField("skills", index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className={styles.button} onClick={() => addField("skills")}>
                            Add Skill
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        className={styles.button}
                        onClick={() => {
                            const resumeData = generateResumeJson();
                            exportResumeAsPDF(resumeData);
                        }}
                    >
                        Export Resume as PDF
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            const resumeData = generateResumeJson();

                            const jsonBlob = new Blob([JSON.stringify(resumeData, null, 2)], { type: "application/json" });

                            const url = URL.createObjectURL(jsonBlob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "resume.json";
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                    >
                        Save as JSON
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;