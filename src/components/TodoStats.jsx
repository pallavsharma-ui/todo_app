import { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

const TodoStats = memo(({ todos }) => {
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter(todo => todo.completed).length
    const active = total - completed
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

    const statsObj = {
      total,
      completed,
      active,
      completionPercentage
    }

    console.log('📊 TodoStats: Calculated stats:', statsObj)
    return statsObj
  }, )

  console.log('📊 TodoStats: Rendering with', todos.length, 'todos')

  if (stats.total === 0) {
    return (
      <div className="todo-stats">
        <p className="stats-message">No todos yet. Start by adding your first task!</p>
      </div>
    )
  }

  return (
    <div className="todo-stats">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.completionPercentage}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>
      
      {stats.total > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${stats.completionPercentage}%` }}
          ></div>
        </div>
      )}
    </div>
  )
})

TodoStats.displayName = 'TodoStats'

TodoStats.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default TodoStats
