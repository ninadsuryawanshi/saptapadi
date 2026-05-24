import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>Sapta<span>padi</span></div>
            <p className={styles.tagline}>Seven steps. One sacred bond. Finding your soulmate through tradition and trust.</p>
          </div>
          
          <div className={styles.linksCol}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/register">Register</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className={styles.linksCol}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} Saptapadi. All rights reserved.</p>
          <div className={styles.legal}>
            <span>Made with devotion in Kolhapur 🪔</span>
            {/* Hidden Admin Link */}
            <Link href="/saptapadi-admin-portal" className={styles.hiddenAdmin}>
              adm
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
