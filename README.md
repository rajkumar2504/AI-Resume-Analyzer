# AI-powered ATS Resume Analyzer

An advanced resume analysis tool powered by LLaMA-3.1-70B (via Groq) to help job seekers optimize their resumes for Applicant Tracking Systems (ATS).

## Features
- **Resume Parsing**: Extracts text from PDF and DOCX files.
- **ATS Scoring**: Calculates a score based on keywords, formatting, and content.
- **Job Matching**: Compares resume against a specific job description.
- **Skill Gap Analysis**: Identifies missing skills (Must-have vs Nice-to-have).
- **Smart Recommendations**: Provides actionable tips to improve the resume.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Chart.js
- **Backend**: Node.js, Express, Multer
- **AI**: Groq API (LLaMA-3.1-70B-Versatile)

## Setup Instructions

### 1. Prerequisites
- Node.js installed.
- A Groq API Key (Get one from [console.groq.com](https://console.groq.com)).

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Open `.env` file.
   - Replace `your_groq_api_key_here` with your actual Groq API Key.
   ```env
   PORT=5000
   GROQ_API_KEY=gsk_...
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open the frontend URL (usually `http://localhost:5173`).
2. Upload your Resume (PDF/DOCX).
3. Enter the Target Job Title and Job Description.
4. Click "Analyze Resume".
5. View the detailed report and recommendations.
