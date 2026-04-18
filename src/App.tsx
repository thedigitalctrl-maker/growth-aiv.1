import React, { useState, useEffect } from 'react'
import { MessageSquare, Type, Users, FileText, ExternalLink } from 'lucide-react'
import VoiceTraining, { VoiceProfile } from './components/VoiceTraining'
import CommentAssistant from './components/CommentAssistant'
import BoldTextMaker from './components/BoldTextMaker'
import SmartConnect from './components/SmartConnect'
import ResumeBuilder from './components/ResumeBuilder'

type TabType = 'comment' | 'bold' | 'connect' | 'resume'

const tabs = [
  { id: 'comment' as TabType, label: 'Comment Assistant', icon: MessageSquare },
  { id: 'bold' as TabType, label: 'Bold Text Maker', icon: Type },
  { id: 'connect' as TabType, label: 'Smart Connect', icon: Users },
  { id: 'resume' as TabType, label: 'Resume Builder', icon: FileText },
]

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('comment')
  const [trainingComplete, setTrainingComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile | null>(null)

  useEffect(() => {
    // Check if training is complete
    const trained = localStorage.getItem('trainingComplete')
    const profile = localStorage.getItem('voiceProfile')
    
    if (trained && profile) {
      setTrainingComplete(true)
      setVoiceProfile(JSON.parse(profile))
    }
    
    setIsLoading(false)
  }, [])

  const handleTrainingComplete = (profile: VoiceProfile) => {
    setVoiceProfile(profile)
    setTrainingComplete(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-transparent to-cyan-600 opacity-10"></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading Growth AI...</p>
        </div>
      </div>
    )
  }

  if (!trainingComplete) {
    return <VoiceTraining onComplete={handleTrainingComplete} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'comment':
        return <CommentAssistant />
      case 'bold':
        return <BoldTextMaker />
      case 'connect':
        return <SmartConnect />
      case 'resume':
        return <ResumeBuilder />
      default:
        return <CommentAssistant />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Growth AI</h1>
                <p className="text-xs text-cyan-400">Professional LinkedIn Growth Tools</p>
              </div>
            </div>
            <a
              href="https://forms.gle/D7iWUJ9tJ8yWYFuN7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <ExternalLink size={16} />
              Feedback
            </a>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="glass-card border-b backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full relative z-10">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="glass-card border-t backdrop-blur-xl mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div className="text-center md:text-left mb-4 md:mb-0">
              Growth AI - Professional LinkedIn Growth Tools
            </div>
            <div className="flex gap-6 text-center md:text-right">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
              <a href="https://forms.gle/D7iWUJ9tJ8yWYFuN7" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Feedback</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
