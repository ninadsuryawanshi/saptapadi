'use client';

import React from 'react';
import styles from '../RegistrationForm.module.css';

interface Props {
  data: any;
  update: (data: any) => void;
  next: () => void;
  prev: () => void;
}

const CareerEducation = ({ data, update, next, prev }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.stepTitleMain}>Education & Professional Details</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup + ' ' + styles.full}>
          <label>Education / शिक्षण *</label>
          <input 
            type="text" 
            required 
            className={styles.input} 
            value={data.education}
            onChange={(e) => update({ education: e.target.value })}
            placeholder="e.g. B.E., MBA, B.Com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Occupation / व्यवसाय *</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            value={data.occupation}
            onChange={(e) => update({ occupation: e.target.value })}
            placeholder="e.g. Software Engineer, Doctor"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Job Location / नोकरीचे ठिकाण</label>
          <input 
            type="text" 
            className={styles.input}
            value={data.jobLocation}
            onChange={(e) => update({ jobLocation: e.target.value })}
            placeholder="City, State / Country"
          />
        </div>

        <div className={styles.formGroup + ' ' + styles.full}>
          <label>Annual Income / वार्षिक उत्पन्न *</label>
          <select 
            required 
            className={styles.select}
            value={data.annualIncome}
            onChange={(e) => update({ annualIncome: e.target.value })}
          >
            <option value="">Select Income Range</option>
            <option>Below ₹3 LPA</option>
            <option>₹3 – 6 LPA</option>
            <option>₹6 – 12 LPA</option>
            <option>₹12 – 24 LPA</option>
            <option>Above ₹24 LPA</option>
            <option>Prefer not to disclose</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={prev} className={styles.btnPrev}>Back</button>
        <button type="submit" className={styles.btnNext}>Family & Contact</button>
      </div>
    </form>
  );
};

export default CareerEducation;
