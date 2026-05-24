import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidate extends Document {
  status: 'pending_review' | 'active' | 'rejected';
  
  personal: {
    fullName: string;
    gender: 'Male' | 'Female';
    dob: Date;
    birthPlace: string;
    address: string;
    raas?: string;
    gana?: string;
    gotra?: string;
    shakha?: string;
    nakshatra?: string;
    charan?: string;
    naad?: string;
    mangal: 'Yes' | 'No';
    diet: 'Vegetarian' | 'Non-Vegetarian';
    height?: string;
    weight?: string;
    bloodGroup?: string;
    profilePhotoUrl: string;
    aadhaarUrl?: string;
  };
  
  education: {
    qualification: string;
    occupation: string;
    jobLocation?: string;
    annualIncome?: string;
  };
  
  family: {
    fatherName: string;
    fatherDetails?: string;
    motherName: string;
    motherDetails?: string;
    siblingDetails?: string;
    disability: 'None' | 'Yes';
  };
  
  partnerExpectations: string;
  
  contact: {
    phone1: string;
    phone2?: string;
    email: string;
  };
  
  payment: {
    transactionId: string;
    screenshotUrl: string;
    amount: number;
    status: 'pending' | 'verified' | 'rejected';
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema: Schema = new Schema({
  status: { type: String, enum: ['pending_review', 'active', 'rejected'], default: 'pending_review' },
  
  personal: {
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    dob: { type: Date, required: true },
    birthPlace: { type: String, required: true },
    address: { type: String, required: true },
    raas: String,
    gana: String,
    gotra: String,
    shakha: String,
    nakshatra: String,
    charan: String,
    naad: String,
    mangal: { type: String, enum: ['Yes', 'No'], required: true },
    diet: { type: String, enum: ['Vegetarian', 'Non-Vegetarian'], required: true },
    height: String,
    weight: String,
    bloodGroup: String,
    profilePhotoUrl: { type: String, required: true },
    aadhaarUrl: String,
  },
  
  education: {
    qualification: { type: String, required: true },
    occupation: { type: String, required: true },
    jobLocation: String,
    annualIncome: String,
  },
  
  family: {
    fatherName: { type: String, required: true },
    fatherDetails: String,
    motherName: { type: String, required: true },
    motherDetails: String,
    siblingDetails: String,
    disability: { type: String, enum: ['None', 'Yes'], default: 'None' },
  },
  
  partnerExpectations: { type: String, maxLength: 500 },
  
  contact: {
    phone1: { type: String, required: true, unique: true },
    phone2: String,
    email: { type: String, required: true, unique: true },
  },
  
  payment: {
    transactionId: { type: String, required: true },
    screenshotUrl: { type: String, required: true },
    amount: { type: Number, default: 1001 },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  },
}, { timestamps: true });

export default mongoose.models.Candidate || mongoose.model<ICandidate>('Candidate', CandidateSchema);
