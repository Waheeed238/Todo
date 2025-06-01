"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Todo } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Trash2, Check, X } from "lucide-react"

interface TodoItemProps {
  todo: Todo | null
  onUpdate: (id: string, text: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onUpdate, onToggle, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo?.text || "")

  useEffect(() => {
    setEditText(todo?.text || "")
  }, [todo?.text])

  // Add null check to prevent errors
  if (!todo) {
    return null
  }

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim())
      setIsEditing(false)
    } else {
      handleCancel()
    }
  }

  const handleCancel = () => {
    setEditText(todo.text || "")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
      <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} className="flex-shrink-0" />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCancel}
            className="w-full"
            autoFocus
          />
        ) : (
          <div
            className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} className="text-gray-600 hover:text-gray-700">
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
