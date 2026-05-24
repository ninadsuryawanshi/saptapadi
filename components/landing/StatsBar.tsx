'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatsBar.module.css';

const stats = [
  { value: "12,400+", label: "Families United" },
  { value: "26 Yrs", label: "Of Trusted Service" },
  { value: "98%", label: "Satisfaction Rate" },
];

const StatsBar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={styles.item}
          >
            <div className={styles.value}>{stat.value}</div>
            <div className={styles.label}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
