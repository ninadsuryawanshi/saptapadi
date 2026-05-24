'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.content}
        >
          <div className={styles.eyebrow}>Trusted since 1998 · Pune, Maharashtra</div>
          <h1 className={styles.title}>
            Seven Steps.<br />
            One <em>Sacred</em><br />
            Bond.
          </h1>
          <p className={styles.sub}>
            Saptapadi walks beside you on the most meaningful journey of your life — 
            finding a life partner rooted in shared values, culture, and mutual devotion.
          </p>
          <div className={styles.actions}>
            <Link href="/register" className={styles.btnPrimary}>Create Your Profile</Link>
            <Link href="/about" className={styles.btnSecondary}>Our Story</Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={styles.visual}
        >
          <div className={styles.mandalaWrapper}>
            <svg viewBox="0 0 300 300" className={styles.mandala}>
              <motion.circle 
                cx="150" cy="150" r="140" 
                stroke="var(--gold)" strokeWidth="0.5" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              <motion.circle 
                cx="150" cy="150" r="110" 
                stroke="var(--gold)" strokeWidth="0.5" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.2 }}
              />
              <motion.polygon 
                points="150,10 181.4,106.7 283.1,106.7 200.9,166.5 232.3,263.3 150,203.5 67.7,263.3 99.1,166.5 16.9,106.7 118.6,106.7" 
                stroke="var(--gold)" strokeWidth="0.5" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
            <div className={styles.mandalaText}>
              <span className={styles.devanagari}>सप्त</span>
              <span className={styles.caption}>Saptapadi · सात कदम</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className={styles.overlayText}>Traditional Matrimony</div>
    </section>
  );
};

export default Hero;
