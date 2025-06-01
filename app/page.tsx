"use client"

import { useState, useEffect } from "react"
import type { Todo } from "@/lib/types"
import TodoItem from "@/components/TodoItem"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Circle, Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const text = formData.get("todo") as string
              if (text.trim()) {
                addTodo(text.trim())
                e.currentTarget.reset()
              }
            }}
            className="flex gap-2"
          >
            <Input type="text" name="todo" placeholder="What needs to be done?" className="flex-1" autoFocus />
            <Button type="submit">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Circle className="w-4 h-4 mr-1" />
                  {activeCount} active
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {completedCount} completed
                </span>
              </div>
              {completedCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear completed
                </Button>
              )}
            </div>

            <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All ({todos.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {filter === "all" && "No todos yet. Add one above!"}
                {filter === "active" && "No active todos. Great job!"}
                {filter === "completed" && "No completed todos yet."}
              </div>
            ) : (
              <div className="divide-y">
                {filteredTodos
                  .filter((todo) => todo && todo.id && todo.text !== undefined)
                  .map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
