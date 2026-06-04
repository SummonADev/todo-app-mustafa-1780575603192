import React from 'react'
import type { FilterType } from '@/types'

interface Props {
  filter: FilterType
  setFilter: (f: FilterType) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export default function TodoFilter({
  filter,
  setFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500 bg-white border-t border-gray-200">
      <span className="min-w-[6rem]">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-2 py-1 rounded transition-colors ${
              filter === f.value
                ? 'border border-purple-300 text-purple-600'
                : 'hover:border hover:border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="min-w-[6rem] text-right">
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="hover:text-gray-700 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  )
}
