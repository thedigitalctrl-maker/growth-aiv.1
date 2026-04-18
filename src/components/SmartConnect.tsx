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
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Smart Connect</h2>
        <p className="text-slate-400 mb-6">Analyze LinkedIn profiles and get personalized connection suggestions</p>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            LinkedIn Profile URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-600"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!profileUrl.trim() || isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Profile Summary</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white">{analysis.name}</h4>
                <p className="text-slate-400">{analysis.headline}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Briefcase size={14} className="text-cyan-400" />
                  <span className="text-sm text-slate-400">{analysis.industry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Points */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Connection Points</h3>
            <ul className="space-y-3">
              {analysis.connectionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-cyan-500/20">
                    <span className="text-white text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Message Templates */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={20} className="text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Suggested Connection Messages</h3>
            </div>
            <div className="space-y-4">
              {analysis.messageTemplates.map((template, index) => (
                <div key={index} className="p-4 bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-500/30 transition-colors">
                  <p className="text-slate-300 mb-3">{template}</p>
                  <button
                    onClick={() => handleCopy(template, index)}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
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
