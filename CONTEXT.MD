# Saptapadi Project Context

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT with bcrypt hashing for Admin
- **File Storage**: Vercel Blob (proposed)
- **Email**: Resend (for OTP and Admin notifications)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
- `/app`: Contains all pages and API routes.
- `/app/api`: Serverless functions for registration, verification, and admin.
- `/components`: Reusable UI elements, modularized by section (landing, register, admin).
- `/lib`: Database connection, models, and utility functions (email, pdf, otp).
- `/styles`: Global styles and CSS Modules.

## Key Logic
- **Registration**: Multi-step form → Data stored with `pending_otp` status → OTP sent via Resend.
- **Verification**: OTP verified → Status changed to `pending_review` → Admin notified.
- **Admin**: Login via secret URL → View candidates → Filter by complex criteria → Export to PDF.

## Maintenance Notes
- Keep animations smooth and "royal".
- Ensure all forms have validation.
- Maintain the Crimson/Gold aesthetic.
