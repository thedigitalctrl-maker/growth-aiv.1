import React, { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface VoiceTrainingProps {
  onComplete: (profile: VoiceProfile) => void
}

export interface VoiceProfile {
  tonality: string
  commonWords: string[]
  fillers: string[]
  sentenceLength: 'short' | 'medium' | 'long'
  emojiUsage: 'none' | 'occasional' | 'frequent'
  signaturePhrases: string[]
}

export function VoiceTraining({ onComplete }: VoiceTrainingProps) {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState({
    promotion: '',
    disagreement: '',
    advice: ''
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const steps = [
    {
      title: 'Voice Training',
      subtitle: 'Help us learn your writing style for personalized suggestions',
      question: 'Write a LinkedIn comment congratulating a colleague on a promotion.',
      key: 'promotion'
    },
    {
      title: 'Voice Training',
      subtitle: 'Help us learn your writing style for personalized suggestions',
      question: 'Someone posts: "AI will replace all software engineers in 5 years." You disagree respectfully. Write your reply.',
      key: 'disagreement'
    },
    {
      title: 'Voice Training',
      subtitle: 'Help us learn your writing style for personalized suggestions',
      question: 'A junior asks for advice on learning data science. Share your tips.',
      key: 'advice'
    }
  ]

  const currentStep = steps[step]

  const handleTextChange = (value: string) => {
    setResponses({
      ...responses,
      [currentStep.key]: value
    })
  }

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      setIsAnalyzing(true)
      // Mock analysis - would call real AI in production
      setTimeout(() => {
        const profile: VoiceProfile = {
          tonality: 'Professional with warmth',
          commonWords: ['think', 'believe', 'good', 'great', 'important'],
          fillers: ['Honestly', 'In my opinion', 'I think', 'Just my two cents'],
          sentenceLength: 'medium',
          emojiUsage: 'none',
          signaturePhrases: ['Looking forward to', 'Hope this helps']
        }
        localStorage.setItem('voiceProfile', JSON.stringify(profile))
        localStorage.setItem('trainingComplete', 'true')
        onComplete(profile)
      }, 2000)
    }
  }

  const handleSkip = () => {
    const defaultProfile: VoiceProfile = {
      tonality: 'Professional',
      commonWords: ['great', 'thanks', 'appreciate', 'good', 'help'],
      fillers: ['I think', 'In my opinion'],
      sentenceLength: 'medium',
      emojiUsage: 'none',
      signaturePhrases: []
    }
    localStorage.setItem('voiceProfile', JSON.stringify(defaultProfile))
    localStorage.setItem('trainingComplete', 'true')
    onComplete(defaultProfile)
  }

  const isAnswered = responses[currentStep.key as keyof typeof responses].trim().length >= 20

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Step {step + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {isAnalyzing ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mb-4"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mt-4">Analyzing your voice</h2>
              <p className="text-gray-600 mt-2">Creating your personalized profile...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{currentStep.title}</h1>
                <p className="text-gray-600 mt-2">{currentStep.subtitle}</p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  {currentStep.question}
                </label>
                <textarea
                  value={responses[currentStep.key as keyof typeof responses]}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Type your response here (minimum 20 characters)..."
                  className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none resize-none text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {responses[currentStep.key as keyof typeof responses].length} characters
                </p>
              </div>

              <div className="flex gap-3 justify-between">
                <button
                  onClick={handleSkip}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Use default style
                </button>

                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2 px-6 py-2 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      <ChevronLeft size={18} />
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                      isAnswered
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {step === steps.length - 1 ? 'Complete Training' : 'Continue'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VoiceTraining
