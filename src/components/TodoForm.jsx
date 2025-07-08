import { useState } from 'react'
import PropTypes from 'prop-types'

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('📝 TodoForm: Form submitted with value:', inputValue)
    
    if (inputValue.trim()) {
      onAddTodo(inputValue)
      setInputValue('')
      console.log('✅ TodoForm: Todo added and input cleared')
    } else {
      console.warn('⚠️ TodoForm: Attempted to submit empty todo')
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    console.log('⌨️ TodoForm: Input changed:', value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('⏎ TodoForm: Enter key pressed')
      handleSubmit(e)
    }
  }

  console.log('🔄 TodoForm: Component re-render with inputValue:', inputValue)

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="todo-input"
          autoFocus
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={!inputValue.trim()}
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
}

export default TodoForm
