import { useState, useEffect } from 'react'
import type { Todo, FilterType } from '@/types'

const STORAGE_KEY = 'todo-app-todos'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Todo[]
  } catch {
    // ignore
  }
  return []
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
    ])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return deleteTodo(id)
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text: trimmed } : t))
    )
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const toggleAll = () => {
    const allDone = todos.every(t => t.completed)
    setTodos(prev => prev.map(t => ({ ...t, completed: !allDone })))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos: filtered,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  }
}
