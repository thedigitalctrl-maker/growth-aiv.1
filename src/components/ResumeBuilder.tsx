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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
            <FileText className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Resume Builder</h2>
            <p className="text-sm text-gray-500">Create a professional resume in minutes</p>
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-700 mb-3">Choose a Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                selectedTemplate === template.id
                  ? 'border-primary bg-primary bg-opacity-5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{template.name}</span>
                {selectedTemplate === template.id && (
                  <Check size={18} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-gray-500">{template.description}</p>
            </button>
          ))}
        </div>

        <h3 className="text-sm font-medium text-gray-700 mb-3">Select Job Title</h3>
        <select
          value={resumeData.jobTitle}
          onChange={(e) => updateField('jobTitle', e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
        >
          <option value="">Select a job title...</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      {/* Resume Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Edit3 size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Edit Your Resume</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Personal Information</h4>
            <input
              type="text"
              placeholder="Full Name"
              value={resumeData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={resumeData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={resumeData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
            />
            <input
              type="text"
              placeholder="Location (City, State)"
              value={resumeData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
            />
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Professional Summary</h4>
            <textarea
              placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
              value={resumeData.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-gray-900"
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Work Experience</h4>
            <textarea
              placeholder="List your work experience with company names, roles, dates, and key achievements..."
              value={resumeData.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-gray-900"
            />
          </div>

          {/* Education & Skills */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Education</h4>
            <textarea
              placeholder="List your educational background including degrees, institutions, and graduation dates..."
              value={resumeData.education}
              onChange={(e) => updateField('education', e.target.value)}
              className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-gray-900"
            />
            <h4 className="font-medium text-gray-800">Skills</h4>
            <textarea
              placeholder="List your key skills separated by commas..."
              value={resumeData.skills}
              onChange={(e) => updateField('skills', e.target.value)}
              className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-gray-900"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Eye size={18} />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            <Download size={18} />
            Download Resume
          </button>
        </div>
      </div>

      {/* Live Preview */}
      {showPreview && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
          <div className={`p-8 border border-gray-200 rounded-lg bg-white ${
            selectedTemplate === 'modern' ? 'border-l-4 border-l-primary' :
            selectedTemplate === 'classic' ? 'border-t-4 border-t-gray-800' :
            ''
          }`}>
            <div className={`${selectedTemplate === 'modern' ? 'text-center' : ''}`}>
              <h1 className="text-2xl font-bold text-gray-900">
                {resumeData.fullName || 'Your Name'}
              </h1>
              <p className="text-lg text-primary font-medium">
                {resumeData.jobTitle || 'Your Job Title'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {[resumeData.email, resumeData.phone, resumeData.location].filter(Boolean).join(' | ') || 'Contact Information'}
              </p>
            </div>

            {resumeData.summary && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-gray-700 text-sm">{resumeData.summary}</p>
              </div>
            )}

            {resumeData.experience && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
                  Experience
                </h2>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{resumeData.experience}</p>
              </div>
            )}

            {resumeData.education && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
                  Education
                </h2>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{resumeData.education}</p>
              </div>
            )}

            {resumeData.skills && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-1 mb-2">
                  Skills
                </h2>
                <p className="text-gray-700 text-sm">{resumeData.skills}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilder
