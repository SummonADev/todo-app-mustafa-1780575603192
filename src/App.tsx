import React from 'react'
import { useTodos } from '@/hooks/useTodos'
import TodoInput from '@/components/TodoInput'
import TodoItem from '@/components/TodoItem'
import TodoFilter from '@/components/TodoFilter'

export default function App() {
  const {
    todos,
    allTodos,
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
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex flex-col items-center pt-16 px-4">
      <h1 className="text-6xl font-thin text-purple-300 mb-8 tracking-widest select-none">
        todos
      </h1>

      <div className="w-full max-w-lg shadow-2xl rounded-lg overflow-hidden">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          hasItems={allTodos.length > 0}
        />

        {todos.length > 0 && (
          <ul className="bg-white">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}

        {allTodos.length === 0 && (
          <div className="bg-white px-4 py-10 text-center text-gray-400 text-sm">
            No todos yet — add one above!
          </div>
        )}

        {allTodos.length > 0 && (
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>

      <p className="mt-8 text-gray-400 text-xs">
        Double-click a todo to edit it
      </p>
    </div>
  )
}
