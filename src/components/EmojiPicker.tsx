import { useState } from 'react'
import { X } from 'lucide-react'

const EMOJI_CATEGORIES = {
  holiday: ['🎄', '🎅', '🤶', '🎁', '⛄', '☃️', '❄️', '⭐', '✨', '🔔', '🕯️', '🦌', '🎊', '🎉', '🎈', '🎀', '🧦', '🍪'],
  smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊'],
  food: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥑', '🍕', '🍔', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🎮', '🕹️', '🎲', '♠️', '♥️', '♦️', '♣️', '🃏', '🀄', '🎴'],
  objects: ['🎁', '🎈', '🎉', '🎊', '🎋', '🎍', '🎏', '🎐', '🎀', '🎗️', '🎟️', '🎫', '🎖️', '🏆', '🏅', '🥇', '🥈', '🥉'],
  symbols: ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '⭐', '✨', '💫', '⚡', '💥', '💢', '💨', '💦', '💧', '🌟', '⭐'],
}

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  onClose: () => void
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const [category, setCategory] = useState<keyof typeof EMOJI_CATEGORIES>('holiday')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Pick an Emoji</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Category tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {Object.keys(EMOJI_CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as keyof typeof EMOJI_CATEGORIES)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                category === cat 
                  ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Emoji grid */}
        <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
          {EMOJI_CATEGORIES[category].map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(emoji)}
              className="text-3xl hover:bg-gray-100 rounded-lg p-2 transition-all hover:scale-110 active:scale-95"
              title={`Add ${emoji} emoji`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Click an emoji to add it to your card!</p>
        </div>
      </div>
    </div>
  )
}