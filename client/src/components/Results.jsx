import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, Briefcase, BookOpen, Code } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const ScoreChart = ({ score, label, color }) => {
    const data = {
        labels: ['Score', 'Remaining'],
        datasets: [
            {
                data: [score, 100 - score],
                backgroundColor: [color, 'rgba(255, 255, 255, 0.1)'],
                borderWidth: 0,
                cutout: '75%',
            },
        ],
    };

    const options = {
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        rotation: -90,
        circumference: 180,
    };

    return (
        <div className="relative w-40 h-24 mx-auto">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
                <span className="text-3xl font-bold text-white">{score}%</span>
                <span className="text-xs text-slate-400">{label}</span>
            </div>
        </div>
    );
};

const Section = ({ title, icon: Icon, children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-panel p-6 ${className}`}
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
                <Icon className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {children}
    </motion.div>
);

const Results = ({ data }) => {
    if (!data) return null;

    const { atsScore, jobMatch, skillGap, improvements, careerGuidance, resumeSummary } = data;

    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto pb-20">
            {/* Top Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Section title="ATS Score" icon={FileText}>
                    <ScoreChart score={atsScore.score} label="ATS Score" color="#3b82f6" />
                    <p className="text-sm text-slate-300 mt-2 text-center">{atsScore.explanation}</p>
                </Section>
                <Section title="Job Match" icon={Briefcase}>
                    <ScoreChart score={jobMatch.percentage} label="Match Rate" color="#8b5cf6" />
                    <p className="text-sm text-slate-300 mt-2 text-center">{jobMatch.explanation}</p>
                </Section>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Section title="Matched Skills" icon={CheckCircle}>
                    <div className="flex flex-wrap gap-2">
                        {jobMatch.matchedSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>
                <Section title="Missing Skills" icon={XCircle}>
                    <div className="flex flex-wrap gap-2">
                        {jobMatch.missingSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30">
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>
            </div>

            {/* Skill Gap & Recommendations */}
            <Section title="Skill Gap Analysis" icon={BookOpen}>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-red-400 mb-2">Must Have</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {skillGap.mustHave.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-yellow-400 mb-2">Nice to Have</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {skillGap.niceToHave.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Improvements */}
            <Section title="Resume Improvements" icon={AlertTriangle}>
                <div className="space-y-4">
                    <ul className="space-y-2">
                        {improvements.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300">
                                <ArrowRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <h4 className="text-sm font-medium text-white mb-2">Suggested Bullet Points</h4>
                        <ul className="space-y-2">
                            {improvements.bulletPoints.map((bp, i) => (
                                <li key={i} className="text-sm text-slate-300 italic">"{bp}"</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Career Guidance */}
            <Section title="Career Guidance" icon={Briefcase}>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">Suitability:</span>
                        <span className={`font-bold ${careerGuidance.suitability === 'High' ? 'text-green-400' :
                                careerGuidance.suitability === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            {careerGuidance.suitability}
                        </span>
                    </div>
                    <p className="text-slate-300">{careerGuidance.recommendation}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-3 bg-slate-800/30 rounded-lg">
                            <h5 className="text-xs font-semibold text-blue-400 uppercase mb-2">Short Term</h5>
                            <p className="text-sm text-slate-300">{careerGuidance.roadmap.shortTerm}</p>
                        </div>
                        <div className="p-3 bg-slate-800/30 rounded-lg">
                            <h5 className="text-xs font-semibold text-purple-400 uppercase mb-2">Long Term</h5>
                            <p className="text-sm text-slate-300">{careerGuidance.roadmap.longTerm}</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

import { FileText } from 'lucide-react'; // Import missing icon
export default Results;
