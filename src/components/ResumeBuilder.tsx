import React, { useState } from 'react'
import { FileText, Download, Eye, Edit3, Check } from 'lucide-react'

interface ResumeData {
  fullName: string
  email: string
  phone: string
  location: string
  jobTitle: string
  summary: string
  experience: string
  education: string
  skills: string
}

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant style' },
]

const jobTitles = [
  'Software Engineer',
  'Product Manager',
  'Marketing Manager',
  'Data Analyst',
  'UX Designer',
  'Sales Representative',
  'Project Manager',
  'Business Analyst',
  'Content Writer',
  'HR Manager',
]

function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [showPreview, setShowPreview] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  })

  const updateField = (field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }))
  }

  const handleDownload = () => {
    const content = `
${resumeData.fullName}
${resumeData.jobTitle}
${resumeData.email} | ${resumeData.phone} | ${resumeData.location}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience}

EDUCATION
${resumeData.education}

SKILLS
${resumeData.skills}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.fullName || 'resume'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Resume Builder</h2>
        <p className="text-slate-400 mb-6">Create a professional resume in minutes</p>

        <h3 className="text-sm font-medium text-slate-300 mb-3">Choose a Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedTemplate === template.id
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/20'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{template.name}</span>
                {selectedTemplate === template.id && (
                  <Check size={18} className="text-cyan-400" />
                )}
              </div>
              <p className="text-sm text-slate-400">{template.description}</p>
            </button>
          ))}
        </div>

        <h3 className="text-sm font-medium text-slate-300 mb-3">Select Job Title</h3>
        <select
          value={resumeData.jobTitle}
          onChange={(e) => updateField('jobTitle', e.target.value)}
          className="w-full md:w-auto px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white"
        >
          <option value="">Select a job title...</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      {/* Resume Form */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <Edit3 size={20} className="text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Edit Your Resume</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-300">Personal Information</h4>
            <input
              type="text"
              placeholder="Full Name"
              value={resumeData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-600"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={resumeData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-600"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={resumeData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-600"
            />
            <input
              type="text"
              placeholder="Location (City, State)"
              value={resumeData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-600"
            />
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-300">Professional Summary</h4>
            <textarea
              placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
              value={resumeData.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              className="w-full h-40 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none text-white placeholder-slate-600"
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-300">Work Experience</h4>
            <textarea
              placeholder="List your work experience with company names, roles, dates, and key achievements..."
              value={resumeData.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              className="w-full h-20 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none text-white placeholder-slate-600"
            />
            <h4 className="font-medium text-slate-300">Education</h4>
            <textarea
              placeholder="List your educational qualifications including university name, degree, and graduation date..."
              value={resumeData.education}
              onChange={(e) => updateField('education', e.target.value)}
              className="w-full h-20 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none text-white placeholder-slate-600"
            />
            <h4 className="font-medium text-slate-300">Skills</h4>
            <textarea
              placeholder="List your key skills separated by commas..."
              value={resumeData.skills}
              onChange={(e) => updateField('skills', e.target.value)}
              className="w-full h-20 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none text-white placeholder-slate-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6 pt-6 border-t border-slate-700">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Eye size={18} />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <Download size={18} />
            Download Resume
          </button>
        </div>
      </div>

      {/* Live Preview */}
      {showPreview && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className={`p-8 border rounded-lg bg-slate-900/50 ${
            selectedTemplate === 'modern' ? 'border-l-4 border-l-cyan-400' :
            selectedTemplate === 'classic' ? 'border-t-4 border-t-white' :
            'border-slate-700'
          }`}>
            <div className={`${selectedTemplate === 'modern' ? 'text-center' : ''}`}>
              <h1 className="text-2xl font-bold text-white">
                {resumeData.fullName || 'Your Name'}
              </h1>
              <p className="text-lg text-cyan-400 font-medium">
                {resumeData.jobTitle || 'Your Job Title'}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                {[resumeData.email, resumeData.phone, resumeData.location].filter(Boolean).join(' | ') || 'Contact Information'}
              </p>
            </div>

            {resumeData.summary && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide border-b border-slate-700 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-slate-300 text-sm">{resumeData.summary}</p>
              </div>
            )}

            {resumeData.experience && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide border-b border-slate-700 pb-1 mb-2">
                  Experience
                </h2>
                <p className="text-slate-300 text-sm whitespace-pre-wrap">{resumeData.experience}</p>
              </div>
            )}

            {resumeData.education && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide border-b border-slate-700 pb-1 mb-2">
                  Education
                </h2>
                <p className="text-slate-300 text-sm whitespace-pre-wrap">{resumeData.education}</p>
              </div>
            )}

            {resumeData.skills && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide border-b border-slate-700 pb-1 mb-2">
                  Skills
                </h2>
                <p className="text-slate-300 text-sm">{resumeData.skills}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilder
