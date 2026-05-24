'use client';

import React from 'react';
import styles from '../RegistrationForm.module.css';

interface Props {
  data: any;
  update: (data: any) => void;
  next: () => void;
  prev: () => void;
}

const AstroCulture = ({ data, update, next, prev }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.stepTitleMain}>Astrological & Cultural Details</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Raas / राशी</label>
          <select 
            className={styles.select}
            value={data.raas}
            onChange={(e) => update({ raas: e.target.value })}
          >
            <option value="">Select Raas</option>
            <option>Mesh</option><option>Vrushabh</option><option>Mithun</option>
            <option>Karka</option><option>Simha</option><option>Kanya</option>
            <option>Tula</option><option>Vrushchik</option><option>Dhanu</option>
            <option>Makar</option><option>Kumbha</option><option>Meen</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Nakshatra / नक्षत्र</label>
          <input 
            type="text" 
            className={styles.input}
            value={data.nakshatra}
            onChange={(e) => update({ nakshatra: e.target.value })}
            placeholder="Enter Nakshatra"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Gana / गण</label>
          <select 
            className={styles.select}
            value={data.gana}
            onChange={(e) => update({ gana: e.target.value })}
          >
            <option value="">Select Gana</option>
            <option>Dev Gana</option>
            <option>Manushya Gana</option>
            <option>Rakshas Gana</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Gotra / गोत्र</label>
          <input 
            type="text" 
            className={styles.input}
            value={data.gotra}
            onChange={(e) => update({ gotra: e.target.value })}
            placeholder="Enter Gotra"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Mangal / मंगळ *</label>
          <select 
            required 
            className={styles.select}
            value={data.mangal}
            onChange={(e) => update({ mangal: e.target.value })}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Partial">Partial / Anshik</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Charan / चरण</label>
          <input 
            type="number" min="1" max="4"
            className={styles.input}
            value={data.charan}
            onChange={(e) => update({ charan: e.target.value })}
            placeholder="1-4"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={prev} className={styles.btnPrev}>Back</button>
        <button type="submit" className={styles.btnNext}>Education & Career</button>
      </div>
    </form>
  );
};

export default AstroCulture;
