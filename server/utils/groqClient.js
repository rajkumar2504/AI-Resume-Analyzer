const Groq = require('groq-sdk');

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY is not set or is invalid in .env file');
  }
  return new Groq({ apiKey });
};

const analyzeResumeWithAI = async (resumeText, jobTitle, jobDescription) => {
  const groq = getGroqClient();

  const prompt = `
You are an advanced AI-powered ATS Resume Analyzer, Job Matcher, and Career Advisor.

Analyze the resume and job description provided below and generate a complete professional hiring report.

========================
INPUT
========================

Resume Content:
${resumeText}

Target Job Role:
${jobTitle}

Job Description:
${jobDescription}

========================
TASKS
========================

1. Resume Parsing
- Extract technical skills
- Extract soft skills
- Summarize work experience
- Identify education details
- Identify tools, frameworks, and projects

2. ATS Resume Scoring
- Calculate ATS score (0–100)
- Explain the score logically
- Identify missing ATS keywords
- Highlight weak or unclear sections

3. Job Matching Analysis
- Compare resume with job description
- Calculate job match percentage (0–100)
- List matched skills
- List missing required skills
- Explain the reason for the match score

4. Skill Gap Analysis
- Categorize gaps into:
  • Must-have skills
  • Nice-to-have skills
- Suggest how to close each gap

5. Resume Improvement Suggestions
- ATS-optimized bullet point improvements
- Strong action verbs
- Keyword enhancements
- Formatting and clarity tips
- Provide 2 improved resume bullet examples

6. Career Guidance
- Suitability level (High / Medium / Low)
- Final recommendation:
  Apply Now / Improve Resume / Learn Missing Skills
- Short-term and long-term learning roadmap
- Related job roles to explore

========================
OUTPUT FORMAT
========================

Return ONLY the result in valid JSON format with the following structure. Do not include any markdown formatting or code blocks (like \`\`\`json). Just the raw JSON string.

{
  "resumeSummary": {
    "experience": "string",
    "education": "string",
    "technicalSkills": ["string"],
    "softSkills": ["string"],
    "projects": ["string"]
  },
  "atsScore": {
    "score": number,
    "explanation": "string",
    "missingKeywords": ["string"],
    "weakSections": ["string"]
  },
  "jobMatch": {
    "percentage": number,
    "matchedSkills": ["string"],
    "missingSkills": ["string"],
    "explanation": "string"
  },
  "skillGap": {
    "mustHave": ["string"],
    "niceToHave": ["string"],
    "suggestions": ["string"]
  },
  "improvements": {
    "tips": ["string"],
    "bulletPoints": ["string"]
  },
  "careerGuidance": {
    "suitability": "High" | "Medium" | "Low",
    "recommendation": "string",
    "roadmap": {
      "shortTerm": "string",
      "longTerm": "string"
    },
    "relatedRoles": ["string"]
  }
}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1, // Low temperature for consistent JSON output
    });

    const content = completion.choices[0]?.message?.content;
    console.log('Raw AI Response:', content);

    // Attempt to parse JSON. Sometimes LLMs add markdown code blocks even when asked not to.
    let jsonString = content;
    if (content.includes('```json')) {
      jsonString = content.split('```json')[1].split('```')[0];
    } else if (content.includes('```')) {
      jsonString = content.split('```')[1].split('```')[0];
    }

    return JSON.parse(jsonString.trim());
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};

module.exports = { analyzeResumeWithAI };
