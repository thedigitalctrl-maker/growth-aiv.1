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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Growth AI...</p>
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Growth AI</h1>
                <p className="text-sm text-gray-500">Professional LinkedIn Growth Tools</p>
              </div>
            </div>
            <a
              href="https://forms.gle/D7iWUJ9tJ8yWYFuN7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <ExternalLink size={16} />
              Give Feedback
            </a>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
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
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="text-center md:text-left mb-4 md:mb-0">
              Growth AI - Professional LinkedIn Growth Tools
            </div>
            <div className="flex gap-6 text-center md:text-right">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="https://forms.gle/D7iWUJ9tJ8yWYFuN7" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Feedback</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
