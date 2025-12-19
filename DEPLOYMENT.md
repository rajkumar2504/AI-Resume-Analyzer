# Deployment Guide for AI-Powered ATS Resume Analyzer

This guide covers how to upload your code to GitHub and deploy the application using **Vercel** (Frontend) and **Render** (Backend).

## 1. Upload to GitHub

1.  **Initialize Git** (if you haven't already):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create a Repository on GitHub**:
    - Go to [GitHub.com](https://github.com) and log in.
    - Click the **+** icon in the top right and select **New repository**.
    - Name it `ai-resume-analyzer`.
    - Click **Create repository**.

3.  **Push Code**:
    - Copy the commands under "…or push an existing repository from the command line".
    - It will look like this (replace `YOUR_USERNAME`):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
    git branch -M main
    git push -u origin main
    ```

---

## 2. Deploy Backend (Render)

We will use **Render** because it supports Node.js and is free/cheap.

1.  **Sign up/Login** to [Render.com](https://render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub account and select the `ai-resume-analyzer` repository.
4.  **Configure the Service**:
    - **Name**: `ai-resume-analyzer-api`
    - **Root Directory**: `server` (Important!)
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
5.  **Environment Variables**:
    - Scroll down to "Environment Variables".
    - Add `GROQ_API_KEY`: Paste your key from `.env`.
    - Add `PORT`: `10000` (Render uses this port internally).
6.  Click **Create Web Service**.
7.  **Copy the Backend URL**: Once deployed, copy the URL (e.g., `https://ai-resume-analyzer-api.onrender.com`).

---

## 3. Deploy Frontend (Vercel)

1.  **Sign up/Login** to [Vercel.com](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import the `ai-resume-analyzer` repository.
4.  **Configure Project**:
    - **Framework Preset**: Vite
    - **Root Directory**: Click "Edit" and select `client`.
5.  **Environment Variables**:
    - We need to tell the frontend where the backend is.
    - In your local code, open `client/src/App.jsx`.
    - **Update the API URL**:
      - Currently, it is hardcoded to `http://localhost:5000`.
      - You should change it to use an environment variable like `import.meta.env.VITE_API_URL`.
    - **Add Variable in Vercel**:
      - Name: `VITE_API_URL`
      - Value: Your Render Backend URL (e.g., `https://ai-resume-analyzer-api.onrender.com`).
6.  Click **Deploy**.

---

## 4. Final Code Adjustment (Before Deploying)

To make the frontend work with the deployed backend, you need to update `client/src/App.jsx`.

**Change this line:**
```javascript
const response = await axios.post('http://localhost:5000/api/analyze', formData, ...
```

**To this:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await axios.post(`${API_URL}/api/analyze`, formData, ...
```

Then commit and push these changes to GitHub. Vercel will automatically redeploy!
