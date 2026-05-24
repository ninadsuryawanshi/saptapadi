'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const AboutPage = () => {
  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.eyebrow}>Our Story</div>
            <h1 className={styles.title}>A Legacy of<br />Sacred Unions</h1>
            <p className={styles.text}>
              Since 2024, Saptapadi has stood at the intersection of timeless tradition and compassionate service — 
              walking beside families through life's most meaningful journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Section */}
      <section className={styles.origin}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.visual}
            >
              <div className={styles.year}>2024</div>
              <div className={styles.symbol}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M6.3 6.3l11.4 11.4" />
                  <path d="M6.3 17.7l11.4-11.4" />
                  <circle cx="12" cy="12" r="3" fill="var(--gold)" opacity="0.2"/>
                </svg>
              </div>
              <div className={styles.location}>Est. in Kolhapur, Maharashtra</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.textContent}
            >
              <h2 className={styles.sectionTitle}>Born from a Belief in<br />Meaningful Connections</h2>
              <p className={styles.sectionText}>
                Saptapadi was founded in 2024 by Varsha Patil with a singular vision: to create a matrimony service built on dignity, transparency, and deep cultural respect. Witnessing the modern challenges families face in finding the right life partner, she set out to bridge the gap between tradition and today's world.
              </p>
              <blockquote className={styles.quote}>
                "Marriage is not merely a union of two individuals — it is the meeting of two families, two lineages, two sets of dreams."
                <cite>— Varsha Patil, Founder</cite>
              </blockquote>
              <p className={styles.sectionText}>
                Operating from Kolhapur, Saptapadi maintains a deeply personal, unhurried ethos — ensuring every family is treated as our own, and every match is guided by genuine care and understanding.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>Our Philosophy</div>
            <h2 className={styles.titleDark}>What We Stand <em>For</em></h2>
          </div>
          
          <div className={styles.valuesGrid}>
            {[
              { num: "01", title: "Integrity", text: "Every promise we make is one we keep. Honesty forms the foundation of every interaction." },
              { num: "02", title: "Tradition", text: "We honour the richness of Indian culture while remaining open to modern values." },
              { num: "03", title: "Empathy", text: "We understand the vulnerability in this search. Our counsellors approach every family with genuine care." },
              { num: "04", title: "Discretion", text: "Privacy is sacred. We protect personal information with strict protocols and informed consent." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={styles.valueItem}
              >
                <div className={styles.valueNum}>{value.num}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueText}>{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>Our People</div>
            <h2 className={styles.titleDark}>The Faces Behind <em>Saptapadi</em></h2>
          </div>
          
            <div className={styles.teamGrid} style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={styles.teamCard}
              >
                <div className={styles.avatar}>👩🏽‍💼</div>
                <h3 className={styles.name}>Varsha Patil</h3>
                <p className={styles.role}>Founder & Director</p>
              </motion.div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
