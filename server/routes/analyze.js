const express = require('express');
const multer = require('multer');
const { parseResume } = require('../utils/fileParser');
const { analyzeResumeWithAI } = require('../utils/groqClient');

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        const { jobTitle, jobDescription } = req.body;

        if (!jobTitle || !jobDescription) {
            return res.status(400).json({ error: 'Job title and description are required' });
        }

        // 1. Parse Resume
        const resumeText = await parseResume(req.file);

        // 2. Analyze with AI
        const analysisResult = await analyzeResumeWithAI(resumeText, jobTitle, jobDescription);

        // 3. Return Result
        res.json(analysisResult);

    } catch (error) {
        console.error('Analysis error details:', error);
        res.status(500).json({ error: error.message || 'Internal server error', details: error.toString() });
    }
});

module.exports = router;
