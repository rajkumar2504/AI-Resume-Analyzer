# AI-powered ATS Resume Analyzer - Implementation Plan

## 1. Project Structure
- Root directory: `AI-powered ATS Resume Analyzer`
- `/client`: React + Vite frontend
- `/server`: Node.js + Express backend

## 2. Backend Setup (Node.js + Express)
- **Dependencies**: 
  - `express`: Web server
  - `cors`: Cross-origin resource sharing
  - `dotenv`: Environment variables
  - `multer`: File uploads
  - `pdf-parse`: PDF text extraction
  - `mammoth`: DOCX text extraction (more reliable than `docx` for text)
  - `groq-sdk`: AI integration
  - `pg`: PostgreSQL client (will set up structure, might mock for initial run if DB not available)
  - `jsonwebtoken`, `bcryptjs`: Auth
- **Endpoints**:
  - `POST /api/analyze`: Accepts resume file + job description, returns analysis.
  - `POST /api/auth/register`: User registration.
  - `POST /api/auth/login`: User login.

## 3. Frontend Setup (React + Vite)
- **Dependencies**:
  - `tailwindcss`, `postcss`, `autoprefixer`: Styling
  - `framer-motion`: Animations
  - `axios`: API requests
  - `chart.js`, `react-chartjs-2`: Visualizations
  - `lucide-react`: Icons
  - `react-dropzone`: File upload UI
- **Pages**:`
  - `LandingPage`: Hero section, features.
  - `Dashboard`: Main analysis view.
  - `Auth`: Login/Register.
- **Design**:
  - Dark/Light mode support (defaulting to a premium dark theme).
  - Glassmorphism effects.
  - Responsive layout.

## 4. AI Integration (Groq)
- **Model**: LLaMA-3.1-70B-Versatile
- **Prompt**: As specified in the user request.
- **Logic**: 
  1. Extract text from uploaded resume.
  2. Combine with Job Description.
  3. Send to Groq API with the master prompt.
  4. Parse JSON response.

## 5. Database (PostgreSQL)
- **Schema**:
  - `users`: id, email, password_hash
  - `analyses`: id, user_id, resume_text, job_description, result_json, created_at
- *Note*: Will set up the connection logic but handle errors gracefully if DB is not reachable during local dev.

## 6. Implementation Steps
1. Initialize `server` and install dependencies.
2. Create basic Express server with file upload and text extraction.
3. Implement Groq API integration.
4. Initialize `client` with Vite and Tailwind.
5. Build the Dashboard UI (Upload + Results).
6. Connect Frontend to Backend.
7. Refine Design (Animations, Charts).
