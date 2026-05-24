'use client';

import React, { useState } from 'react';
import styles from '../RegistrationForm.module.css';

interface Props {
  data: any;
  update: (data: any) => void;
  next: () => void;
  prev: () => void;
}

const FamilyContact = ({ data, update, next, prev }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, phone1: data.phone1 })
      });

      const result = await res.json();

      if (result.exists) {
        setError(result.message);
        setLoading(false);
        return;
      }

      next();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.stepTitleMain}>Family & Contact Details</h2>
      
      {error && (
        <div style={{ color: '#8B1A2C', background: '#FDECEC', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #8B1A2C', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Father's Name / वडिलांचे नाव *</label>
          <input 
            type="text" 
            required 
            className={styles.input} 
            value={data.fatherName}
            onChange={(e) => update({ fatherName: e.target.value })}
            placeholder="Father's full name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Mother's Name / आईचे नाव *</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            value={data.motherName}
            onChange={(e) => update({ motherName: e.target.value })}
            placeholder="Mother's full name"
          />
        </div>

        <div className={styles.formGroup + ' ' + styles.full}>
          <label>Sibling Details / भाऊ-बहिणींची माहिती</label>
          <input 
            type="text" 
            className={styles.input}
            value={data.siblingDetails}
            onChange={(e) => update({ siblingDetails: e.target.value })}
            placeholder="e.g. 1 elder brother (married), 1 younger sister"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Contact No. 1 *</label>
          <input 
            type="tel" 
            required 
            className={styles.input}
            value={data.phone1}
            onChange={(e) => update({ phone1: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email Address *</label>
          <input 
            type="email" 
            required 
            className={styles.input}
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>

        <div className={styles.formGroup + ' ' + styles.full}>
          <label>Partner Expectations / अपेक्षा</label>
          <textarea 
            className={styles.textarea}
            value={data.partnerExpectations}
            onChange={(e) => update({ partnerExpectations: e.target.value })}
            placeholder="Describe what you are looking for (max 500 characters)"
            maxLength={500}
          ></textarea>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={prev} className={styles.btnPrev} disabled={loading}>Back</button>
        <button type="submit" className={styles.btnNext} disabled={loading}>
          {loading ? 'Checking...' : 'Final Step: Payment'}
        </button>
      </div>
    </form>
  );
};

export default FamilyContact;
