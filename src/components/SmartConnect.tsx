import React, { useState } from 'react'
import { Search, User, Briefcase, MessageSquare, ExternalLink, RefreshCw } from 'lucide-react'

interface ProfileAnalysis {
  name: string
  headline: string
  industry: string
  connectionPoints: string[]
  messageTemplates: string[]
}

const analyzeProfile = (url: string): ProfileAnalysis => {
  // Simulated profile analysis
  const names = ['Alex Johnson', 'Sarah Chen', 'Michael Roberts', 'Emily Davis']
  const headlines = [
    'Senior Product Manager at Tech Corp',
    'Marketing Director | Growth Strategist',
    'Software Engineer | AI Enthusiast',
    'Startup Founder | Angel Investor'
  ]
  const industries = ['Technology', 'Marketing', 'Software Development', 'Venture Capital']
  
  const randomIndex = Math.floor(Math.random() * names.length)
  
  return {
    name: names[randomIndex],
    headline: headlines[randomIndex],
    industry: industries[randomIndex],
    connectionPoints: [
      'Shared interest in industry innovation and emerging technologies',
      'Both active in professional networking and thought leadership',
      'Common connections in the startup ecosystem',
      'Aligned career goals in digital transformation',
    ],
    messageTemplates: [
      `Hi [Name], I noticed your impressive work in ${industries[randomIndex]}. I would love to connect and learn more about your journey.`,
      `Hello [Name], Your insights on LinkedIn have been valuable. I am working on similar challenges and would appreciate connecting.`,
      `Hi [Name], We share some mutual connections and I believe there could be valuable synergies between our work. Would you be open to connecting?`,
    ]
  }
}

function SmartConnect() {
  const [profileUrl, setProfileUrl] = useState('')
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleAnalyze = () => {
    if (!profileUrl.trim()) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setAnalysis(analyzeProfile(profileUrl))
      setIsAnalyzing(false)
    }, 1200)
  }

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-linkedin bg-opacity-10 rounded-lg flex items-center justify-center">
            <User className="text-linkedin" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Smart Connect</h2>
            <p className="text-sm text-gray-500">Analyze LinkedIn profiles and get personalized connection suggestions</p>
          </div>
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-linkedin text-gray-900"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!profileUrl.trim() || isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-linkedin text-white rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Analyzing
                </>
              ) : (
                <>
                  <Search size={18} />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Profile Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="text-gray-500" size={32} />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{analysis.name}</h4>
                <p className="text-gray-600">{analysis.headline}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{analysis.industry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Points */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Points</h3>
            <ul className="space-y-3">
              {analysis.connectionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Message Templates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Suggested Connection Messages</h3>
            </div>
            <div className="space-y-4">
              {analysis.messageTemplates.map((template, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 mb-3">{template}</p>
                  <button
                    onClick={() => handleCopy(template, index)}
                    className="text-sm text-primary hover:text-opacity-80 transition-colors"
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy message'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SmartConnect
