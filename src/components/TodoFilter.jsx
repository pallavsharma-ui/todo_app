import { memo } from 'react'
import PropTypes from 'prop-types'

const TodoFilter = memo(({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ]

  console.log('🔍 TodoFilter: Rendering with current filter:', currentFilter)

  const handleFilterClick = (filterKey) => {
    console.log('🔍 TodoFilter: Filter clicked:', filterKey)
    onFilterChange(filterKey)
  }

  return (
    <div className="todo-filter">
      <span className="filter-label">Show:</span>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
})

TodoFilter.displayName = 'TodoFilter'

TodoFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default TodoFilter
