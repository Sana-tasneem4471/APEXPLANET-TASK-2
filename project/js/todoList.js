import { showNotification } from './notification.js';

export function initTodoList() {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const tasksCount = document.getElementById('tasks-count');
  const clearCompletedBtn = document.getElementById('clear-completed');
  
  if (!todoForm || !todoInput || !todoList || !tasksCount || !clearCompletedBtn) return;
  
  // Load todos from local storage
  let todos = loadTodos();
  
  // Render initial todos
  renderTodos();
  updateTasksCount();
  
  // Add new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const todoText = todoInput.value.trim();
    
    if (todoText) {
      addTodo(todoText);
      todoInput.value = '';
      todoInput.focus();
    }
  });
  
  // Clear completed todos
  clearCompletedBtn.addEventListener('click', () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    
    if (completedCount === 0) {
      showNotification('No completed tasks to clear');
      return;
    }
    
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
    updateTasksCount();
    
    showNotification(`Cleared ${completedCount} completed ${completedCount === 1 ? 'task' : 'tasks'}`);
  });
  
  function addTodo(text) {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    
    todos.push(newTodo);
    saveTodos();
    renderTodo(newTodo, true);
    updateTasksCount();
    
    showNotification('Task added');
  }
  
  function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
      updateTasksCount();
    }
  }
  
  function deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex !== -1) {
      const todoItem = document.querySelector(`[data-id="${id}"]`);
      
      // Add removing animation
      todoItem.classList.add('todo-item-removing');
      
      // Wait for animation to complete
      setTimeout(() => {
        todos.splice(todoIndex, 1);
        saveTodos();
        renderTodos();
        updateTasksCount();
        
        showNotification('Task removed');
      }, 300);
    }
  }
  
  function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
      renderTodo(todo);
    });
  }
  
  function renderTodo(todo, isNew = false) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    
    if (isNew) {
      li.classList.add('todo-item-new');
    }
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id);
      li.classList.toggle('completed');
    });
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-delete';
    deleteBtn.innerHTML = '<span class="material-icons">close</span>';
    deleteBtn.addEventListener('click', () => {
      deleteTodo(todo.id);
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    todoList.appendChild(li);
  }
  
  function updateTasksCount() {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    
    tasksCount.textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'} (${completedTasks} completed)`;
  }
  
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
}