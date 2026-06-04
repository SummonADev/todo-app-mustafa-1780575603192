import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '@/types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const commitEdit = () => {
    onEdit(todo.id, editValue)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditValue(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
        style={{
          borderColor: todo.completed ? '#a855f7' : '#d1d5db',
          backgroundColor: todo.completed ? '#a855f7' : 'transparent',
        }}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base text-gray-700 outline-none border-b-2 border-purple-400 bg-transparent py-0.5"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 text-base cursor-pointer select-none ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 text-lg leading-none"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </li>
  )
}
