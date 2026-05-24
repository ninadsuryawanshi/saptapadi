'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Success.module.css';

const SuccessPage = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.content}
      >
        <div className={styles.diyaWrapper}>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={styles.flame}
          />
          <div className={styles.diya}>🪔</div>
        </div>

        <h1 className={styles.title}>🙏 Thank You for Registering!</h1>
        <p className={styles.text}>
          Your biodata has been received securely. Our team will carefully review your profile
          and documents. You will receive highly compatible matches directly on call
          from our experienced matchmakers.
        </p>

        <div className={styles.note}>
          Thank You for Registering.
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.btnHome}>Return to Home</Link>
          <Link href="/about" className={styles.btnAbout}>Learn about our process</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
