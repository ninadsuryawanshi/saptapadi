'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, UserCheck, Lock, Globe, Star } from 'lucide-react';
import styles from './FeaturesGrid.module.css';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Verified Profiles",
    text: "Every profile is manually reviewed and verified with government ID. Only authentic individuals seeking genuine connections."
  },
  {
    icon: <Heart size={32} />,
    title: "Cultural Alignment",
    text: "Deep matching across Gotra, Nakshatra, and family values. Honouring traditions that matter to you."
  },
  {
    icon: <UserCheck size={32} />,
    title: "Personal Counselling",
    text: "Experienced matchmakers provide dedicated one-on-one guidance throughout your search journey."
  },
  {
    icon: <Lock size={32} />,
    title: "Complete Privacy",
    text: "Your details are shared only with your express consent. Robust controls give you full command."
  },
  {
    icon: <Globe size={32} />,
    title: "Global Network",
    text: "With members across India and 14 countries, Saptapadi connects you to quality profiles worldwide."
  },
  {
    icon: <Star size={32} />,
    title: "Astrology Integration",
    text: "Optional Kundli matching and Guna Milan services available with our resident Jyotishi."
  }
];

const FeaturesGrid = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Why Saptapadi</div>
          <h2 className={styles.title}>Where Tradition Meets <em>Trust</em></h2>
        </div>

        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
