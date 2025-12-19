import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ file, setFile }) => {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc']
        },
        multiple: false
    });

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Resume (PDF or DOCX)
            </label>

            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'}
          ${file ? 'bg-slate-800/50 border-blue-500/50' : ''}
        `}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div className="p-4 bg-slate-800 rounded-full mb-4">
                                <Upload className="w-8 h-8 text-blue-400" />
                            </div>
                            <p className="text-lg font-medium text-white">
                                {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
                            </p>
                            <p className="text-sm text-slate-400 mt-1">
                                or click to browse files
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <FileText className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-white truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
                                </div>
                            </div>
                            <button
                                onClick={removeFile}
                                className="p-1 hover:bg-slate-600 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400 hover:text-white" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FileUpload;
