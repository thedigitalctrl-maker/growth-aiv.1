import React, { useState } from 'react'
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react'

const tones = [
  { id: 'professional', label: 'Professional' },
  { id: 'supportive', label: 'Supportive' },
  { id: 'curious', label: 'Curious' },
  { id: 'insightful', label: 'Insightful' },
  { id: 'enthusiastic', label: 'Enthusiastic' },
]

const generateComments = (postContent: string, tone: string): string[] => {
  const templates: Record<string, string[]> = {
    professional: [
      `This is a valuable perspective on ${postContent.slice(0, 30)}... The strategic implications here are significant for industry professionals.`,
      `Great analysis. Your point about this topic aligns well with current market trends and best practices.`,
      `Thank you for sharing this insight. It reinforces the importance of continuous learning in our field.`,
    ],
    supportive: [
      `Love this! Your journey and insights are truly inspiring. Keep sharing your valuable experiences.`,
      `This resonates deeply. Thank you for being open about your experiences - it helps so many of us.`,
      `What an amazing perspective! Your authenticity shines through and motivates others to do the same.`,
    ],
    curious: [
      `Fascinating take! I am curious - how do you see this evolving in the next few years?`,
      `Interesting perspective. What challenges did you face when implementing this approach?`,
      `Great insights here. Would love to hear more about the specific strategies that worked best for you.`,
    ],
    insightful: [
      `This connects well with broader industry shifts we are seeing. The underlying pattern here suggests significant opportunities.`,
      `Building on your point - this also ties into the growing emphasis on sustainable practices in our sector.`,
      `Your observation highlights a critical gap many overlook. The implications extend beyond just this context.`,
    ],
    enthusiastic: [
      `Absolutely brilliant! This is exactly the kind of forward-thinking approach our industry needs!`,
      `Yes! This is spot on. Cannot agree more with your perspective here - game changing insights!`,
      `This is fantastic! Your energy and vision come through clearly. Excited to see where this leads!`,
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
    }, 800)
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
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-gray-900"
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
                    ? 'bg-primary text-white'
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
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Comments
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
                  className="flex items-center gap-2 text-sm text-primary hover:text-opacity-80 transition-colors"
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
