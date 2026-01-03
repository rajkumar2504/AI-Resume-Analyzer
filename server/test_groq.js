require('dotenv').config();
const Groq = require('groq-sdk');

const testGroq = async () => {
    try {
        console.log('Testing Groq...');
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error('GROQ_API_KEY not found');
            return;
        }
        console.log('API Key found (length):', apiKey.length);

        const groq = new Groq({ apiKey });
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say hello' }],
            model: 'llama-3.3-70b-versatile',
        });
        console.log('Response:', completion.choices[0].message.content);
    } catch (error) {
        console.error('Caught error:', error);
    }
};

testGroq();
