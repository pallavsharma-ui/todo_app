import { useState, useEffect, useCallback } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import TodoFilter from './components/TodoFilter'
import TodoStats from './components/TodoStats'
import './App.css'

function App() {
  var testVariable = 123 // Renamed to camelCase for rule test
  console.log('Test console log for CodeRabbit rules') // Should trigger 'no-console' warning

  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  // Load todos from localStorage on component mount
  useEffect(() => {
    console.log('🚀 App component mounted')
    const savedTodos = localStorage.getItem('react-todos')
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos)
        setTodos(parsedTodos)
        console.log('📦 Loaded todos from localStorage:', parsedTodos)
      } catch (error) {
        console.error('❌ Error parsing todos from localStorage:', error)
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('react-todos', JSON.stringify(todos))
      console.log('💾 Saved todos to localStorage:', todos)
    }
  }, [todos])

  // Add new todo
  const addTodo = useCallback((text) => {
    if (!text.trim()) {
      console.warn('⚠️ Attempted to add empty todo')
      return
    }

    const newTodo = {
      id: Date.now() + Math.random(), // Simple ID generation
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo]
      console.log('✅ Added new todo:', newTodo)
      console.log('📋 Total todos:', updatedTodos.length)
      return updatedTodos
    })
  }, [])

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed }
          console.log(`🔄 Toggled todo ${id}:`, updatedTodo)
          return updatedTodo
        }
        return todo
      })
      return updatedTodos
    })
  }, [])

  // Delete todo
  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => {
      const todoToDelete = prevTodos.find(todo => todo.id === id)
      const updatedTodos = prevTodos.filter(todo => todo.id !== id)
      console.log('🗑️ Deleted todo:', todoToDelete)
      console.log('📋 Remaining todos:', updatedTodos.length)
      return updatedTodos
    })
  }, [])

  // Edit todo
  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) {
      console.warn('⚠️ Attempted to save empty todo text')
      return
    }

    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, text: newText.trim() }
          console.log(`✏️ Edited todo ${id}:`, updatedTodo)
          return updatedTodo
        }
        return todo
      })
      return updatedTodos
    })
  }, [])

  // Clear completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => {
      const completedCount = prevTodos.filter(todo => todo.completed).length
      const updatedTodos = prevTodos.filter(todo => !todo.completed)
      console.log(`🧹 Cleared ${completedCount} completed todos`)
      console.log('📋 Remaining todos:', updatedTodos.length)
      return updatedTodos
    })
  }, [])

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  // Handle filter change
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
    console.log('🔍 Filter changed to:', newFilter)
  }, [])

  console.log('🔄 App re-render - Current state:', {
    totalTodos: todos.length,
    filteredTodos: filteredTodos.length,
    currentFilter: filter
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Todo App</h1>
        <p>A modern todo application with console logging</p>
      </header>

      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />

        <TodoStats todos={todos} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />

        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />

        {todos.some(todo => todo.completed) && (
          <button
            className="clear-completed-btn"
            onClick={clearCompleted}
          >
            Clear Completed ({todos.filter(todo => todo.completed).length})
          </button>
        )}
      </main>
    </div>
  )
}

function tooManyLinesFunction() {
  const a = 1
  const b = 2
  const c = 3
  const d = 4
  const e = 5
  const f = a + b + c + d + e
  return f
}

function errorTestFunction() {
  var not_camel_case = 42 // Violates both 'no-var' and 'camelcase'
  return not_camel_case
}

export default App