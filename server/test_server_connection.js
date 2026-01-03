
const fs = require('fs');

async function testServer() {
    console.log('--- Testing Server Connectivity ---');
    try {
        console.log('1. Checking Root URL (GET http://localhost:5000/)...');
        const resRoot = await fetch('http://localhost:5000/');
        console.log(`   Status: ${resRoot.status}`);
        const textRoot = await resRoot.text();
        console.log(`   Response: ${textRoot}`);
    } catch (error) {
        console.error('   FAILED to connect to root:', error.cause || error.message);
    }

    try {
        console.log('\n2. Checking Analyze Endpoint (POST http://localhost:5000/api/analyze)...');
        const formData = new FormData();
        // Create a dummy PDF signature
        const pdfBlob = new Blob(['%PDF-1.4\nDummy PDF content'], { type: 'application/pdf' });
        formData.append('resume', pdfBlob, 'test_resume.pdf');
        formData.append('jobTitle', 'Test Role');
        formData.append('jobDescription', 'Test Description');

        const resAnalyze = await fetch('http://localhost:5000/api/analyze', {
            method: 'POST',
            body: formData
        });
        console.log(`   Status: ${resAnalyze.status}`);

        if (resAnalyze.status === 200) {
            const jsonAnalyze = await resAnalyze.json();
            console.log('   Response JSON:', JSON.stringify(jsonAnalyze).substring(0, 100) + '...');
        } else {
            console.log(`   Response: Server reachable but returned status ${resAnalyze.status} (Expected for dummy data)`);
            const errorText = await resAnalyze.text();
            console.log('   Error details:', errorText.substring(0, 100));
        }
    } catch (error) {
        console.error('   FAILED to POST to /api/analyze:', error.cause || error.message);
    }
}

testServer();
