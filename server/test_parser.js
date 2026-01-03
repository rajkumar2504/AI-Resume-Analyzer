const pdfParse = require('pdf-parse');

const testPdf = async () => {
    try {
        console.log('Testing pdf-parse...');
        // Create a minimal valid PDF buffer (this is hard to do manually, so we'll try an empty buffer or invalid one)
        // pdf-parse might throw on invalid buffer.
        const buffer = Buffer.from('Not a PDF');
        const data = await pdfParse(buffer);
        console.log('Parsed text:', data.text);
    } catch (error) {
        console.error('Caught error:', error.message);
    }
};

testPdf();
