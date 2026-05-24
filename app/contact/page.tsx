'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Globe, Camera, Play } from 'lucide-react';
import styles from './Contact.module.css';

const ContactPage = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call for now
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroContent}
        >
          <h1 className={styles.heroTitle}>Reach Out to Us</h1>
          <p className={styles.heroText}>
            We are here to listen, guide, and support you at every step. 
            Our counsellors respond within one business day.
          </p>
        </motion.div>
      </section>

      <section className={styles.body}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.formArea}
            >
              <h2 className={styles.sectionTitle}>Send Us a Message</h2>
              
              {status === 'success' ? (
                <div className={styles.successMessage}>
                  <h3>🙏 Message Sent</h3>
                  <p>Thank you for reaching out. A Saptapadi counsellor will contact you shortly.</p>
                  <button onClick={() => setStatus('idle')} className={styles.resetBtn}>Send another message</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label>Your Name *</label>
                    <input type="text" required placeholder="Full name" />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Email Address *</label>
                    <input type="email" required placeholder="your@email.com" />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Subject</label>
                    <select>
                      <option>New Registration Enquiry</option>
                      <option>Existing Member Support</option>
                      <option>Profile Verification</option>
                      <option>General Feedback</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Your Message *</label>
                    <textarea required placeholder="How can we help you?"></textarea>
                  </div>
                  
                  <button type="submit" disabled={status === 'loading'} className={styles.submitBtn}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.infoArea}
            >
              <h2 className={styles.sectionTitle}>Our Offices</h2>
              
              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}><MapPin size={24} /></div>
                  <div>
                    <h4>Main Office · Pune</h4>
                    <p>12, Shankar Sheth Road, Swargate<br />Pune – 411 037, Maharashtra</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}><Phone size={24} /></div>
                  <div>
                    <h4>Telephone</h4>
                    <p>+91 20 2445 6789<br />+91 98223 45678 (WhatsApp)</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}><Mail size={24} /></div>
                  <div>
                    <h4>Email</h4>
                    <p>contact@saptapadi.in<br />nri@saptapadi.in</p>
                  </div>
                </div>
              </div>

              <div className={styles.socials}>
                <h4>Follow Us</h4>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialBtn}><Globe size={20} /></a>
                  <a href="#" className={styles.socialBtn}><Camera size={20} /></a>
                  <a href="#" className={styles.socialBtn}><Play size={20} /></a>
                </div>
              </div>

              <div className={styles.hours}>
                <h4>Office Hours</h4>
                <table className={styles.hoursTable}>
                  <tbody>
                    <tr><td>Monday – Friday</td><td>10:00 AM – 7:00 PM</td></tr>
                    <tr><td>Saturday</td><td>10:00 AM – 5:00 PM</td></tr>
                    <tr><td>Sunday</td><td>By Appointment</td></tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
