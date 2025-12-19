const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const parseResume = async (file) => {
    try {
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            return data.text;
        } else if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword'
        ) {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            return result.value;
        } else {
            throw new Error('Unsupported file type');
        }
    } catch (error) {
        console.error('Error parsing file:', error);
        throw new Error('Failed to parse resume file');
    }
};

module.exports = { parseResume };
