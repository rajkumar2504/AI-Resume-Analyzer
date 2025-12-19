import React from 'react';

const JobInput = ({ jobTitle, setJobTitle, jobDescription, setJobDescription }) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Target Job Role
                </label>
                <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="input-field"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Job Description
                </label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="input-field min-h-[200px] resize-none"
                />
            </div>
        </div>
    );
};

export default JobInput;
