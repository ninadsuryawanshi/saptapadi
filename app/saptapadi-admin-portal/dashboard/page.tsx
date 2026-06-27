'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Users, 
  Loader2, 
  X, 
  ExternalLink,
  MapPin,
  Briefcase,
  Calendar,
  AlertCircle
} from 'lucide-react';
import styles from './Dashboard.module.css';
import { pdf } from '@react-pdf/renderer';
import CandidatePDF from './components/CandidatePDF';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'Male' | 'Female'>('Female');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    mangal: 'all',
    diet: 'all',
    raas: 'all',
    gotra: '',
    location: '',
    occupation: '',
    minAge: '18',
    maxAge: '60',
    minHeight: 'all',
    maxHeight: 'all',
    minIncome: 'all',
    registeredWithin: 'all',
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  useEffect(() => {
    fetchCandidates();
  }, [activeTab, filters]);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ 
        gender: activeTab,
        ...filters
      });
      
      const res = await fetch(`/api/admin/candidates?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCandidates(data.candidates || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Connection issue. Please check your internet or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (candidates.length === 0) return;
    setExporting(true);
    try {
      const blob = await pdf(
        <CandidatePDF candidates={candidates} title={`${activeTab} Candidates`} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Saptapadi_${activeTab}_Profiles_${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to generate PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>SAPTAPADI</div>
          <span className={styles.adminBadge}>Admin</span>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.statSubtle}>
            <Users size={14} />
            <span>{candidates.length} Profiles</span>
          </div>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsSidebarOpen(true)}
          >
            <Filter size={18} /> Filters
          </button>
          <button className={styles.logoutBtn} onClick={() => window.location.href = '/saptapadi-admin-portal'}>Logout</button>
        </div>
      </header>

      <div className={styles.main}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3><Filter size={14} /> Filter Results</h3>
            <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
          </div>
          
          <div className={styles.filterScroll}>
            <div className={styles.filterGroup}>
              <label>Quick Search</label>
              <div className={styles.searchBox}>
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Name or Phone..." 
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Min Age</label>
                <select value={filters.minAge} onChange={(e) => setFilters({...filters, minAge: e.target.value})}>
                  {Array.from({length: 43}, (_, i) => i + 18).map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Max Age</label>
                <select value={filters.maxAge} onChange={(e) => setFilters({...filters, maxAge: e.target.value})}>
                  {Array.from({length: 43}, (_, i) => i + 18).map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Min Height</label>
                <select value={filters.minHeight} onChange={(e) => setFilters({...filters, minHeight: e.target.value})}>
                  <option value="all">Any</option>
                  {Array.from({length: 81}, (_, i) => i + 140).map(h => (
                    <option key={h} value={h}>{h} cm</option>
                  ))}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Max Height</label>
                <select value={filters.maxHeight} onChange={(e) => setFilters({...filters, maxHeight: e.target.value})}>
                  <option value="all">Any</option>
                  {Array.from({length: 81}, (_, i) => i + 140).map(h => (
                    <option key={h} value={h}>{h} cm</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Minimum Income</label>
              <select value={filters.minIncome} onChange={(e) => setFilters({...filters, minIncome: e.target.value})}>
                <option value="all">Any Income</option>
                <option value="3">₹3 LPA+</option>
                <option value="6">₹6 LPA+</option>
                <option value="12">₹12 LPA+</option>
                <option value="24">₹24 LPA+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Location (City/Place)</label>
              <input 
                type="text" 
                placeholder="Birth or Job Location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Occupation</label>
              <input 
                type="text" 
                placeholder="Profession"
                value={filters.occupation}
                onChange={(e) => setFilters({...filters, occupation: e.target.value})}
              />
            </div>

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Diet</label>
                <select value={filters.diet} onChange={(e) => setFilters({...filters, diet: e.target.value})}>
                  <option value="all">Any</option>
                  <option value="Vegetarian">Veg</option>
                  <option value="Non-Vegetarian">Non-Veg</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Mangal</label>
                <select value={filters.mangal} onChange={(e) => setFilters({...filters, mangal: e.target.value})}>
                  <option value="all">Any</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Raas</label>
              <select value={filters.raas} onChange={(e) => setFilters({...filters, raas: e.target.value})}>
                <option value="all">All Raas</option>
                {['Mesh', 'Vrishabh', 'Mithun', 'Kark', 'Simha', 'Kanya', 'Tula', 'Vrischik', 'Dhanu', 'Makar', 'Kumbh', 'Meen'].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Registered Within</label>
              <select value={filters.registeredWithin} onChange={(e) => setFilters({...filters, registeredWithin: e.target.value})}>
                <option value="all">Any Time</option>
                <option value="1">Last 24 Hours</option>
                <option value="3">Last 3 Days</option>
                <option value="7">Last Week</option>
                <option value="30">Last Month</option>
                <option value="90">Last 3 Months</option>
              </select>
            </div>
          </div>

          <button 
            className={styles.exportBtn} 
            onClick={handleDownloadPDF}
            disabled={exporting || candidates.length === 0}
          >
            {exporting ? <Loader2 size={18} className={styles.spin} /> : <Download size={18} />}
            {exporting ? 'Preparing PDF...' : 'Download Results'}
          </button>
        </aside>

        {/* Content Area */}
        <main className={styles.content}>
          <div className={styles.tabs}>
            <button 
              className={activeTab === 'Female' ? styles.activeTab : ''} 
              onClick={() => setActiveTab('Female')}
            >
              Female Profiles
            </button>
            <button 
              className={activeTab === 'Male' ? styles.activeTab : ''} 
              onClick={() => setActiveTab('Male')}
            >
              Male Profiles
            </button>
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Fetching Profiles...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <div className={styles.errorIcon}><AlertCircle size={40} /></div>
              <h3>Connection Failed</h3>
              <p>{error}</p>
              <button className={styles.viewBtn} onClick={fetchCandidates} style={{ width: 'auto', padding: '10px 30px' }}>Retry Connection</button>
            </div>
          ) : candidates.length > 0 ? (
            <div className={styles.grid}>
              {candidates.map((c: any) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={c._id} 
                  className={styles.card}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.profileImg}>
                      {c.personal.profilePhotoUrl ? (
                        <img src={c.personal.profilePhotoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      ) : c.personal.fullName[0]}
                    </div>
                    <div className={styles.basicInfo}>
                      <h4>{c.personal.fullName}</h4>
                      <p>{new Date().getFullYear() - new Date(c.personal.dob).getFullYear()} Years · {c.personal.height}</p>
                    </div>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <div className={styles.detail}><span>Occupation</span> {c.education.occupation}</div>
                    <div className={styles.detail}><span>Location</span> {c.personal.birthPlace}</div>
                    <div className={styles.detail}><span>Gotra</span> {c.personal.gotra || 'N/A'}</div>
                    <div className={styles.detail}><span>Diet</span> {c.personal.diet}</div>
                  </div>

                  <button className={styles.viewBtn} onClick={() => setSelectedCandidate(c)}>View Full Details</button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.noData}>
              <Users size={48} color="#ddd" />
              <h3>No Profiles Found</h3>
              <p>Try adjusting your filters or search terms.</p>
              <button className={styles.viewBtn} style={{ width: 'auto', marginTop: '20px' }} onClick={() => setFilters({
                search: '', mangal: 'all', diet: 'all', raas: 'all', 
                gotra: '', location: '', occupation: '', minAge: '18', maxAge: '60', 
                minHeight: 'all', maxHeight: 'all', minIncome: 'all', registeredWithin: 'all'
              })}>Reset All Filters</button>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay} 
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={styles.modalContent} 
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setSelectedCandidate(null)}><X size={20} /></button>
              
              <div className={styles.biodataHeader}>
                <div className={styles.biodataImg}>
                  {selectedCandidate.personal.profilePhotoUrl ? (
                    <img src={selectedCandidate.personal.profilePhotoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : selectedCandidate.personal.fullName[0]}
                </div>
                <div className={styles.biodataMain}>
                  <h2>{selectedCandidate.personal.fullName}</h2>
                  <p>{selectedCandidate.education.occupation} · {selectedCandidate.personal.birthPlace}</p>
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <a href={selectedCandidate.personal.aadhaarUrl} target="_blank" rel="noreferrer" className={styles.statSubtle} style={{ textDecoration: 'none' }}>
                      <ExternalLink size={14} /> ID Proof
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.biodataSection}>
                <h3>Personal & Astro Details</h3>
                <div className={styles.biodataGrid}>
                  <div className={styles.biodataItem}><label>Birth Date</label>{new Date(selectedCandidate.personal.dob).toLocaleDateString()} ({new Date().getFullYear() - new Date(selectedCandidate.personal.dob).getFullYear()} yrs)</div>
                  <div className={styles.biodataItem}><label>Birth Place</label>{selectedCandidate.personal.birthPlace}</div>
                  <div className={styles.biodataItem}><label>Height</label>{selectedCandidate.personal.height || 'N/A'}</div>
                  <div className={styles.biodataItem}><label>Blood Group</label>{selectedCandidate.personal.bloodGroup || 'N/A'}</div>
                  <div className={styles.biodataItem}><label>Gotra</label>{selectedCandidate.personal.gotra || 'N/A'}</div>
                  <div className={styles.biodataItem}><label>Raas</label>{selectedCandidate.personal.raas || 'N/A'}</div>
                  <div className={styles.biodataItem}><label>Mangal</label>{selectedCandidate.personal.mangal}</div>
                  <div className={styles.biodataItem}><label>Diet</label>{selectedCandidate.personal.diet}</div>
                </div>
              </div>

              <div className={styles.biodataSection}>
                <h3>Education & Professional</h3>
                <div className={styles.biodataGrid}>
                  <div className={styles.biodataItem}><label>Qualification</label>{selectedCandidate.education.qualification}</div>
                  <div className={styles.biodataItem}><label>Occupation</label>{selectedCandidate.education.occupation}</div>
                  <div className={styles.biodataItem}><label>Annual Income</label>{selectedCandidate.education.annualIncome || 'N/A'}</div>
                  <div className={styles.biodataItem}><label>Job Location</label>{selectedCandidate.education.jobLocation || 'N/A'}</div>
                </div>
              </div>

              <div className={styles.biodataSection}>
                <h3>Family Information</h3>
                <div className={styles.biodataGrid}>
                  <div className={styles.biodataItem}><label>Father Name</label>{selectedCandidate.family.fatherName}</div>
                  <div className={styles.biodataItem}><label>Father Occ.</label>{selectedCandidate.family.fatherDetails || 'N/A'}</div>
                  <div className={styles.biodataItem}><label>Mother Name</label>{selectedCandidate.family.motherName}</div>
                  <div className={styles.biodataItem}><label>Mother Occ.</label>{selectedCandidate.family.motherDetails || 'N/A'}</div>
                </div>
              </div>

              <div className={styles.biodataSection}>
                <h3>Contact & Expectations</h3>
                <div className={styles.biodataGrid} style={{ marginBottom: '20px' }}>
                  <div className={styles.biodataItem}><label>Primary Phone</label>{selectedCandidate.contact.phone1}</div>
                  <div className={styles.biodataItem}><label>Email Address</label>{selectedCandidate.contact.email}</div>
                </div>
                <div className={styles.textBlock}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Partner Expectations</label>
                  {selectedCandidate.partnerExpectations || 'No specific expectations provided.'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
