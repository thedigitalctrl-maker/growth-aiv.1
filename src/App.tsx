import React, { useState } from 'react'
import { MessageSquare, Type, Users, FileText, ExternalLink } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Growth AI</h1>
                <p className="text-sm text-gray-500">Professional LinkedIn Tools</p>
              </div>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe.../viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              Feedback
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
                      ? 'border-primary text-primary'
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Growth AI - Professional LinkedIn Growth Tools
        </div>
      </footer>
    </div>
  )
}

export default App
