import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#333',
    backgroundColor: '#fff',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '15%',
    transform: 'rotate(-45deg)',
    fontSize: 50,
    color: '#f8f8f8',
    opacity: 0.3,
    zIndex: -1,
  },
  header: {
    marginBottom: 15,
    borderBottom: 1.5,
    borderBottomColor: '#8B0000',
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    color: '#8B0000',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 8,
    color: '#666',
    marginTop: 1,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    gap: 15,
    alignItems: 'center',
  },
  photoBox: {
    width: 100,
    height: 120,
    backgroundColor: '#f9f9f9',
    border: 0.5,
    borderColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainInfo: {
    flex: 1,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 3,
  },
  candidateSub: {
    fontSize: 10,
    color: '#8B0000',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: '#8B0000',
    padding: '3 8',
    marginBottom: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 5,
  },
  gridItem: {
    width: '50%',
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    width: 80,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#000',
  },
  textBlock: {
    padding: 8,
    backgroundColor: '#fcfcfc',
    border: 0.5,
    borderColor: '#eee',
    lineHeight: 1.3,
    fontSize: 8.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#999',
    borderTop: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  }
});

interface Props {
  candidates: any[];
  title: string;
}

const CandidatePDF = ({ candidates, title }: Props) => (
  <Document>
    {candidates.map((c, index) => (
      <Page key={c._id} size="A4" style={styles.page}>
        <Text style={styles.watermark}>SAPTAPADI</Text>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.title}>SAPTAPADI</Text>
            <Text style={styles.subtitle}>Matrimonial Services</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>BIODATA</Text>
            <Text style={{ fontSize: 8, color: '#666' }}>ID: {c._id.substring(c._id.length - 8)}</Text>
          </View>
        </View>

        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.photoBox}>
            <Text style={{ color: '#ccc', fontSize: 8 }}>Profile Photo</Text>
          </View>
          <View style={styles.mainInfo}>
            <Text style={styles.candidateName}>{c.personal.fullName}</Text>
            <Text style={styles.candidateSub}>{c.education.occupation} | {new Date().getFullYear() - new Date(c.personal.dob).getFullYear()} Years</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 15, fontSize: 9, color: '#555' }}>
              <Text>DOB: {new Date(c.personal.dob).toLocaleDateString()}</Text>
              <Text>Height: {c.personal.height || 'N/A'}</Text>
              <Text>Diet: {c.personal.diet}</Text>
            </View>
          </View>
        </View>

        {/* Personal & Astro Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal & Astro Details</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Birth Place:</Text><Text style={styles.value}>{c.personal.birthPlace}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Blood Group:</Text><Text style={styles.value}>{c.personal.bloodGroup || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Gotra:</Text><Text style={styles.value}>{c.personal.gotra || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Raas:</Text><Text style={styles.value}>{c.personal.raas || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Nakshatra:</Text><Text style={styles.value}>{c.personal.nakshatra || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Charan:</Text><Text style={styles.value}>{c.personal.charan || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Gana:</Text><Text style={styles.value}>{c.personal.gana || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Naad:</Text><Text style={styles.value}>{c.personal.naad || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Mangal:</Text><Text style={styles.value}>{c.personal.mangal}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Shakha:</Text><Text style={styles.value}>{c.personal.shakha || 'N/A'}</Text></View>
          </View>
          <View style={{ marginTop: 5, paddingLeft: 5 }}>
            <Text style={styles.label}>Address:</Text>
            <Text style={[styles.value, { marginTop: 2 }]}>{c.personal.address}</Text>
          </View>
        </View>

        {/* Education & Occupation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Professional</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Qualification:</Text><Text style={styles.value}>{c.education.qualification}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Occupation:</Text><Text style={styles.value}>{c.education.occupation}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Job Location:</Text><Text style={styles.value}>{c.education.jobLocation || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Annual Income:</Text><Text style={styles.value}>{c.education.annualIncome || 'N/A'}</Text></View>
          </View>
        </View>

        {/* Family Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Father Name:</Text><Text style={styles.value}>{c.family.fatherName}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Occupation:</Text><Text style={styles.value}>{c.family.fatherDetails || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Mother Name:</Text><Text style={styles.value}>{c.family.motherName}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Occupation:</Text><Text style={styles.value}>{c.family.motherDetails || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Siblings:</Text><Text style={styles.value}>{c.family.siblingDetails || 'None'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Disability:</Text><Text style={styles.value}>{c.family.disability}</Text></View>
          </View>
        </View>

        {/* Partner Expectations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Partner Expectations</Text>
          <View style={styles.textBlock}>
            <Text>
              {c.partnerExpectations 
                ? (c.partnerExpectations.length > 400 
                  ? c.partnerExpectations.substring(0, 400) + '...' 
                  : c.partnerExpectations)
                : 'No specific expectations mentioned.'}
            </Text>
          </View>
        </View>

        {/* Contact Details */}
        <View style={[styles.section, { marginBottom: 0 }]}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}><Text style={styles.label}>Mobile 1:</Text><Text style={styles.value}>{c.contact.phone1}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Mobile 2:</Text><Text style={styles.value}>{c.contact.phone2 || 'N/A'}</Text></View>
            <View style={styles.gridItem}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{c.contact.email}</Text></View>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Saptapadi Matrimony | Generated on ${new Date().toLocaleDateString()} | Confidential Biodata`
        )} fixed />
      </Page>
    ))}
  </Document>
);

export default CandidatePDF;
