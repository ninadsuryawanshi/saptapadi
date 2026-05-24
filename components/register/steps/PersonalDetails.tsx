'use client';

import React from 'react';
import styles from '../RegistrationForm.module.css';

interface Props {
  data: any;
  update: (data: any) => void;
  next: () => void;
}

const PersonalDetails = ({ data, update, next }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.stepTitleMain}>Personal Details</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup + ' ' + styles.full}>
          <label>Full Name / पूर्ण नाव *</label>
          <input 
            type="text" 
            required 
            className={styles.input} 
            value={data.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Gender / लिंग *</label>
          <select 
            required 
            className={styles.select}
            value={data.gender}
            onChange={(e) => update({ gender: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Date of Birth / जन्म तारीख *</label>
          <input 
            type="date" 
            required 
            className={styles.input}
            value={data.dob}
            onChange={(e) => update({ dob: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Birth Place / जन्म ठिकाण *</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            value={data.birthPlace}
            onChange={(e) => update({ birthPlace: e.target.value })}
            placeholder="City, State"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Blood Group / रक्तगट</label>
          <select 
            className={styles.select}
            value={data.bloodGroup}
            onChange={(e) => update({ bloodGroup: e.target.value })}
          >
            <option value="">Select</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>O+</option><option>O-</option>
            <option>AB+</option><option>AB-</option>
          </select>
        </div>

        <div className={styles.formGroup + ' ' + styles.full}>
          <label>Residential Address / पत्ता *</label>
          <textarea 
            required 
            className={styles.textarea}
            value={data.address}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="Current residential address"
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Height / उंची *</label>
          <select 
            required
            className={styles.select}
            value={data.height}
            onChange={(e) => update({ height: e.target.value })}
          >
            <option value="">Select Height</option>
            {Array.from({length: 81}, (_, i) => i + 140).map(h => (
              <option key={h} value={h.toString()}>{h} cm ({Math.floor(h/30.48)}' {Math.round((h/2.54)%12)}")</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Diet / आहार *</label>
          <select 
            required 
            className={styles.select}
            value={data.diet}
            onChange={(e) => update({ diet: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.btnNext}>Continue to Astro Details</button>
      </div>
    </form>
  );
};

export default PersonalDetails;
