# Kanban Board Application

A Kanban-style task management application built using React. This project allows users to create, organize, and manage tasks across different stages such as "To Do", "In Progress", and "Done" with drag-and-drop functionality.

---

## Features

### Task Management
- Create new tasks with title, description, status, and priority
- Edit tasks using a modal with inline editing
- Delete tasks from the board

### Board Layout
- Three columns: To Do, In Progress, Done
- Tasks are visually organized based on their status
- Priority-based sorting within each column

### Drag and Drop
- Move tasks between columns using drag-and-drop
- Task status updates automatically on drop
- Built using dnd-kit

### Persistence
- Tasks are stored in localStorage
- Data persists even after page refresh

### User Interface
- Responsive layout using TailwindCSS
- Clean and minimal UI
- Visual indicators for task priority

---

## Tech Stack

- React JS
- TailwindCSS
- Context API
- React Hooks (useState, useEffect, useContext)
- dnd-kit (for drag-and-drop)
- localStorage

---

## How It Works

- Tasks are stored in a global context using the Context API
- Drag-and-drop interactions update task status dynamically
- Changes are persisted in localStorage using useEffect
- Modal allows editing task details without leaving the board

---