import React, { useState } from 'react'
import { Copy, Check, Type } from 'lucide-react'

// Mathematical Bold characters (U+1D400 - U+1D433)
const mathBoldMap: Record<string, string> = {
  'A': '\u{1D400}', 'B': '\u{1D401}', 'C': '\u{1D402}', 'D': '\u{1D403}', 'E': '\u{1D404}',
  'F': '\u{1D405}', 'G': '\u{1D406}', 'H': '\u{1D407}', 'I': '\u{1D408}', 'J': '\u{1D409}',
  'K': '\u{1D40A}', 'L': '\u{1D40B}', 'M': '\u{1D40C}', 'N': '\u{1D40D}', 'O': '\u{1D40E}',
  'P': '\u{1D40F}', 'Q': '\u{1D410}', 'R': '\u{1D411}', 'S': '\u{1D412}', 'T': '\u{1D413}',
  'U': '\u{1D414}', 'V': '\u{1D415}', 'W': '\u{1D416}', 'X': '\u{1D417}', 'Y': '\u{1D418}',
  'Z': '\u{1D419}',
  'a': '\u{1D41A}', 'b': '\u{1D41B}', 'c': '\u{1D41C}', 'd': '\u{1D41D}', 'e': '\u{1D41E}',
  'f': '\u{1D41F}', 'g': '\u{1D420}', 'h': '\u{1D421}', 'i': '\u{1D422}', 'j': '\u{1D423}',
  'k': '\u{1D424}', 'l': '\u{1D425}', 'm': '\u{1D426}', 'n': '\u{1D427}', 'o': '\u{1D428}',
  'p': '\u{1D429}', 'q': '\u{1D42A}', 'r': '\u{1D42B}', 's': '\u{1D42C}', 't': '\u{1D42D}',
  'u': '\u{1D42E}', 'v': '\u{1D42F}', 'w': '\u{1D430}', 'x': '\u{1D431}', 'y': '\u{1D432}',
  'z': '\u{1D433}',
  '0': '\u{1D7CE}', '1': '\u{1D7CF}', '2': '\u{1D7D0}', '3': '\u{1D7D1}', '4': '\u{1D7D2}',
  '5': '\u{1D7D3}', '6': '\u{1D7D4}', '7': '\u{1D7D5}', '8': '\u{1D7D6}', '9': '\u{1D7D7}',
}

// Sans-Serif Bold characters (U+1D5D4 - U+1D607)
const sansBoldMap: Record<string, string> = {
  'A': '\u{1D5D4}', 'B': '\u{1D5D5}', 'C': '\u{1D5D6}', 'D': '\u{1D5D7}', 'E': '\u{1D5D8}',
  'F': '\u{1D5D9}', 'G': '\u{1D5DA}', 'H': '\u{1D5DB}', 'I': '\u{1D5DC}', 'J': '\u{1D5DD}',
  'K': '\u{1D5DE}', 'L': '\u{1D5DF}', 'M': '\u{1D5E0}', 'N': '\u{1D5E1}', 'O': '\u{1D5E2}',
  'P': '\u{1D5E3}', 'Q': '\u{1D5E4}', 'R': '\u{1D5E5}', 'S': '\u{1D5E6}', 'T': '\u{1D5E7}',
  'U': '\u{1D5E8}', 'V': '\u{1D5E9}', 'W': '\u{1D5EA}', 'X': '\u{1D5EB}', 'Y': '\u{1D5EC}',
  'Z': '\u{1D5ED}',
  'a': '\u{1D5EE}', 'b': '\u{1D5EF}', 'c': '\u{1D5F0}', 'd': '\u{1D5F1}', 'e': '\u{1D5F2}',
  'f': '\u{1D5F3}', 'g': '\u{1D5F4}', 'h': '\u{1D5F5}', 'i': '\u{1D5F6}', 'j': '\u{1D5F7}',
  'k': '\u{1D5F8}', 'l': '\u{1D5F9}', 'm': '\u{1D5FA}', 'n': '\u{1D5FB}', 'o': '\u{1D5FC}',
  'p': '\u{1D5FD}', 'q': '\u{1D5FE}', 'r': '\u{1D5FF}', 's': '\u{1D600}', 't': '\u{1D601}',
  'u': '\u{1D602}', 'v': '\u{1D603}', 'w': '\u{1D604}', 'x': '\u{1D605}', 'y': '\u{1D606}',
  'z': '\u{1D607}',
  '0': '\u{1D7EC}', '1': '\u{1D7ED}', '2': '\u{1D7EE}', '3': '\u{1D7EF}', '4': '\u{1D7F0}',
  '5': '\u{1D7F1}', '6': '\u{1D7F2}', '7': '\u{1D7F3}', '8': '\u{1D7F4}', '9': '\u{1D7F5}',
}

const convertText = (text: string, map: Record<string, string>): string => {
  return text.split('').map(char => map[char] || char).join('')
}

function BoldTextMaker() {
  const [inputText, setInputText] = useState('')
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const mathBoldText = convertText(inputText, mathBoldMap)
  const sansBoldText = convertText(inputText, sansBoldMap)

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
            <Type className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bold Text Maker</h2>
            <p className="text-sm text-gray-500">Convert text to bold Unicode characters for LinkedIn</p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-gray-900"
          />
        </div>

        {/* Results */}
        {inputText && (
          <div className="space-y-4">
            {/* Mathematical Bold */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Mathematical Bold</span>
                <button
                  onClick={() => handleCopy(mathBoldText, 'math')}
                  className="flex items-center gap-2 text-sm text-primary hover:text-opacity-80 transition-colors"
                >
                  {copiedType === 'math' ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-lg text-gray-900 break-words">{mathBoldText}</p>
            </div>

            {/* Sans-Serif Bold */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Sans-Serif Bold</span>
                <button
                  onClick={() => handleCopy(sansBoldText, 'sans')}
                  className="flex items-center gap-2 text-sm text-primary hover:text-opacity-80 transition-colors"
                >
                  {copiedType === 'sans' ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-lg text-gray-900 break-words">{sansBoldText}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-2">Pro Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>Use bold text sparingly for headlines and key phrases</li>
          <li>Mathematical Bold works best for professional content</li>
          <li>Sans-Serif Bold has a modern, clean appearance</li>
          <li>These characters work on LinkedIn, Twitter, and most platforms</li>
        </ul>
      </div>
    </div>
  )
}

export default BoldTextMaker
