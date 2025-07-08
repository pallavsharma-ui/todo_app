import { memo } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = memo(({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  console.log('📋 TodoList: Rendering with', todos.length, 'todos')
  
  if (todos.length === 0) {
    console.log('📋 TodoList: No todos to display')
    return (
      <div className="todo-list-empty">
        <p>No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => {
        console.log('🔄 TodoList: Rendering todo item:', todo.id)
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
          />
        )
      })}
    </div>
  )
})

TodoList.displayName = 'TodoList'

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
}

export default TodoList
