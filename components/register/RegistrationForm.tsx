'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RegistrationForm.module.css';

// Steps components (will be created next)
import PersonalDetails from './steps/PersonalDetails';
import AstroCulture from './steps/AstroCulture';
import CareerEducation from './steps/CareerEducation';
import FamilyContact from './steps/FamilyContact';
import PaymentVerification from './steps/PaymentVerification';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal
    fullName: '', gender: '', dob: '', birthPlace: '', address: '', height: '', weight: '', bloodGroup: '', diet: '', disability: 'None', profilePhoto: null,
    // Astro
    raas: '', gana: '', gotra: '', shakha: '', nakshatra: '', charan: '', naad: '', mangal: 'No',
    // Education & Career
    education: '', occupation: '', jobLocation: '', annualIncome: '',
    // Family & Contact
    fatherName: '', fatherDetails: '', motherName: '', motherDetails: '', siblingDetails: '', phone1: '', phone2: '', email: '', partnerExpectations: '',
    // Payment
    transactionId: '', paymentScreenshot: null
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalDetails data={formData} update={updateFormData} next={nextStep} />;
      case 2: return <AstroCulture data={formData} update={updateFormData} next={nextStep} prev={prevStep} />;
      case 3: return <CareerEducation data={formData} update={updateFormData} next={nextStep} prev={prevStep} />;
      case 4: return <FamilyContact data={formData} update={updateFormData} next={nextStep} prev={prevStep} />;
      case 5: return <PaymentVerification data={formData} update={updateFormData} prev={prevStep} />;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${(currentStep / 5) * 100}%` }}></div>
      </div>
      
      <div className={styles.stepIndicator}>
        Step {currentStep} of 5
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RegistrationForm;
