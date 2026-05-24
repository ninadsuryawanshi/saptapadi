'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../RegistrationForm.module.css';

interface Props {
  data: any;
  update: (data: any) => void;
  prev: () => void;
}

const PaymentVerification = ({ data, update, prev }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to /api/register
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        router.push('/register/success');
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      alert('Error connecting to server.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.stepTitleMain}>Complete Your Registration — ₹1001</h2>
      <p className={styles.stepTextMain}>Please pay ₹1001 via UPI and upload your payment screenshot below.</p>

      <div className={styles.paymentBox}>
        <div className={styles.qrWrapper}>
          {/* Placeholder for QR Code */}
          <div className={styles.qrPlaceholder}>
            <span>UPI QR CODE</span>
          </div>
          <div className={styles.upiId}>UPI ID: <strong>number@upi</strong></div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup + ' ' + styles.full}>
            <label>Transaction ID / व्यवहार क्रमांक *</label>
            <input 
              type="text" 
              required 
              className={styles.input} 
              value={data.transactionId}
              onChange={(e) => update({ transactionId: e.target.value })}
              placeholder="Enter UPI Transaction ID"
            />
          </div>

          <div className={styles.formGroup + ' ' + styles.full}>
            <label>Payment Screenshot / पेमेंट स्क्रीनशॉट *</label>
            <div className={styles.uploadBox}>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // For now we'll just handle it as a placeholder or base64
                    // In a real app we'd use FormData to upload to Vercel Blob
                    update({ paymentScreenshot: 'uploaded_placeholder' });
                  }
                }}
              />
              <p>JPG or PNG · Max 5MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={prev} className={styles.btnPrev} disabled={loading}>Back</button>
        <button type="submit" className={styles.btnSubmit} disabled={loading}>
          {loading ? 'Processing...' : 'Submit Registration'}
        </button>
      </div>
    </form>
  );
};

export default PaymentVerification;
