import React, { useState } from 'react'
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react'

const tones = [
  { id: 'humorous', label: 'Humorous' },
  { id: 'funny', label: 'Funny' },
  { id: 'debate', label: 'Debate' },
  { id: 'professional', label: 'Professional' },
  { id: 'general', label: 'General Short' },
]

const generateComments = (postContent: string, tone: string): string[] => {
  const templates: Record<string, string[]> = {
    humorous: [
      `Plot twist: You are absolutely right about this. Enjoyed reading this perspective!`,
      `If I had a dollar for every time I thought this exact thing... Great insights here.`,
      `This is the kind of content that makes scrolling through LinkedIn worthwhile.`,
    ],
    funny: [
      `Nailed it. Could not have said it better myself - and trust me, I tried.`,
      `This needs to be printed and handed out everywhere. Taking notes over here.`,
      `In other words: perfection. Well done on articulating what everyone is thinking.`,
    ],
    debate: [
      `Interesting perspective, though I would argue the real challenge lies in implementation. What are your thoughts on scalability here?`,
      `Valid points, but consider the counterargument: the market dynamics suggest otherwise. Would love your take on this.`,
      `Strong argument overall, though I think we are overlooking a critical factor. Have you considered the downstream implications?`,
    ],
    professional: [
      `This aligns well with current industry best practices. Your strategic perspective here is valuable for the community.`,
      `Thoughtful analysis. The implications for our field are significant and worth considering carefully.`,
      `Excellent point. This reinforces the importance of continued collaboration and knowledge sharing in our domain.`,
    ],
    general: [
      `Great share. Appreciate you bringing this to the attention of everyone.`,
      `Solid insights. Thanks for contributing to this important discussion.`,
      `Well put. This is the kind of perspective our industry needs.`,
    ],
  }
  return templates[tone] || templates.professional
}

function CommentAssistant() {
  const [postContent, setPostContent] = useState('')
  const [selectedTone, setSelectedTone] = useState('professional')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!postContent.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setSuggestions(generateComments(postContent, selectedTone))
      setIsGenerating(false)
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">LinkedIn Comment Assistant</h2>
        <p className="text-gray-600 mb-6">
          Paste a LinkedIn post and generate thoughtful, engaging comments tailored to your preferred tone.
        </p>

        {/* Post Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Post Content
          </label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Paste the LinkedIn post content here..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none text-gray-900"
          />
        </div>

        {/* Tone Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTone === tone.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!postContent.trim() || isGenerating}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Generating suggestions...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Suggestions
            </>
          )}
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Comments</h3>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-gray-800 mb-3">{suggestion}</p>
                <button
                  onClick={() => handleCopy(suggestion, index)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy to clipboard
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentAssistant
