'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationForm from '@/components/register/RegistrationForm';
import styles from './Register.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <div className={styles.eyebrow}>Begin Your Journey</div>
            <h1 className={styles.sidebarTitle}>Create Your Sacred Profile</h1>
            <p className={styles.sidebarText}>
              Join thousands of families who have found meaningful, lasting connections through Saptapadi. 
              Your perfect match may already be waiting.
            </p>
            
            <div className={styles.steps}>
              {[
                { num: "1", title: "Personal Details", text: "Fill in your background & info" },
                { num: "2", title: "Astro & Culture", text: "Gotra, Nakshatra & more" },
                { num: "3", title: "Career & Education", text: "Professional background" },
                { num: "4", title: "Family & Contact", text: "Lineage & connections" },
                { num: "5", title: "Payment & Submit", text: "Complete your registration" }
              ].map((step, idx) => (
                <div key={idx} className={styles.step}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <div>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepText}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.sidebarFooter}>
              By registering, you agree to our Privacy Policy and Terms of Service. 
              All data is handled with strict confidentiality.
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className={styles.formArea}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
