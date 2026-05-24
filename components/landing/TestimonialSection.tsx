'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TestimonialSection.module.css';

const TestimonialSection = () => {
  return (
    <section className={styles.section}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={styles.container}
      >
        <div className={styles.quoteIcon}>“</div>
        <p className={styles.quote}>
          "We had almost given up hope. Within three months of joining Saptapadi, we found each other. Today we are a family of four, and we owe everything to their caring, unhurried approach."
        </p>
        <div className={styles.divider}></div>
        <div className={styles.author}>PRIYA & ADITYA KULKARNI · Matched 2021 · Pune</div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
