import React, { useState, type KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
  onToggleAll: () => void
  hasItems: boolean
}

export default function TodoInput({ onAdd, onToggleAll, hasItems }: Props) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(value)
      setValue('')
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
      {hasItems && (
        <button
          onClick={onToggleAll}
          className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none select-none"
          aria-label="Toggle all"
        >
          ❯
        </button>
      )}
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 text-lg outline-none placeholder-gray-400 text-gray-700 bg-transparent"
        autoFocus
      />
    </div>
  )
}
