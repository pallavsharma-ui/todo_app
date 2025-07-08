import { useState, useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const editInputRef = useRef(null)

  console.log('📝 TodoItem: Rendering todo', todo.id, '- completed:', todo.completed)

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
      console.log('🎯 TodoItem: Edit input focused for todo', todo.id)
    }
  }, [isEditing, todo.id])

  const handleToggle = () => {
    console.log('🔄 TodoItem: Toggling todo', todo.id)
    onToggle(todo.id)
  }

  const handleDelete = () => {
    console.log('🗑️ TodoItem: Deleting todo', todo.id)
    onDelete(todo.id)
  }

  const handleEdit = () => {
    console.log('✏️ TodoItem: Starting edit mode for todo', todo.id)
    setIsEditing(true)
    setEditText(todo.text)
  }

  const handleSaveEdit = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      console.log('💾 TodoItem: Saving edit for todo', todo.id, 'new text:', editText.trim())
      onEdit(todo.id, editText.trim())
    } else {
      console.log('❌ TodoItem: Edit cancelled or no changes for todo', todo.id)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    console.log('🚫 TodoItem: Cancelling edit for todo', todo.id)
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('⏎ TodoItem: Enter pressed - saving edit')
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      console.log('⎋ TodoItem: Escape pressed - cancelling edit')
      handleCancelEdit()
    }
  }

  const handleEditTextChange = (e) => {
    setEditText(e.target.value)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="edit-mode">
            <input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={handleEditTextChange}
              onKeyDown={handleKeyDown}
              className="edit-input"
            />
            <div className="edit-buttons">
              <button onClick={handleSaveEdit} className="save-btn">
                Save
              </button>
              <button onClick={handleCancelEdit} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <span className="todo-text" onDoubleClick={handleEdit}>
              {todo.text}
            </span>
            <span className="todo-date">
              Created: {formatDate(todo.createdAt)}
            </span>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button onClick={handleEdit} className="edit-btn">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  )
})

TodoItem.displayName = 'TodoItem'

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default TodoItem
