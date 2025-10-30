class TodoApp {
  constructor() {
    // Get references to DOM elements
    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");
    this.todoList = document.getElementById("todoList");
    this.totalCount = document.getElementById("totalCount");
    this.completedCount = document.getElementById("completedCount");

    // Array to store todo items
    this.todos = [];

    // Initialize event listeners
    this.initEventListeners();
  }

  // Set up event listeners
  initEventListeners() {
    // Add todo when button is clicked
    this.addBtn.addEventListener("click", () => this.addTodo());

    // Add todo when Enter key is pressed
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addTodo();
      }
    });
  }

  // Function to add a new todo item
  addTodo() {
    const text = this.todoInput.value.trim();

    // Validate input - don't add empty todos
    if (text === "") {
      this.showInputError("Please enter a task!");
      return;
    }

    // Create new todo object
    const newTodo = {
      id: Date.now(), // Simple ID using timestamp
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    // Add to todos array
    this.todos.push(newTodo);

    // Clear input field
    this.todoInput.value = "";

    // Re-renter the todo list
    this.renderTodos();

    // Update counters
    this.updateStats();

    console.log("Added todo:", newTodo);
  }

  // Show error message for invalid input
  showInputError(message) {
    // Add error styling to input
    this.todoInput.style.borderColor = "#ef4444";
    this.todoInput.placeholder = message;

    // Reset after 2 seconds
    setTimeout(() => {
      this.todoInput.style.borderColor = "";
      this.todoInput.placeholder = "What needs to be done?";
    }, 2000);
  }
  // Function to render all todos to the screen
  renderTodos() {
    // Clear the existing list
    this.todoList.innerHTML = "";

    // If no todos, show empty state
    if (this.todos.length === 0) {
      this.showEmptyState();
      return;
    }

    // Loop through each todo and create HTML
    this.todos.forEach((todo) => {
      const todoItem = this.createTodoElement(todo);
      this.todoList.appendChild(todoItem);
    });
  }

  // Create HTML element for a single todo
  createTodoElement(todo) {
    // Create the main list item
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id; // Store the ID for later use

    // Create the HTML content
    li.innerHTML = `
        <div class="todo-content">
            <button class="complete-btn ${todo.completed ? "completed" : ""}" 
                    data-action="toggle" data-id="${todo.id}">
                ${todo.completed ? "✓" : "○"}
            </button>
            <span class="todo-text ${todo.completed ? "completed" : ""}">${
      todo.text
    }</span>
        </div>
        <div class="todo-actions">
            <button class="edit-btn" data-action="edit" data-id="${todo.id}">
                ✏️
            </button>
            <button class="delete-btn" data-action="delete" data-id="${
              todo.id
            }">
                🗑️
            </button>
        </div>
    `;

    // Add click event listener to the entire item
    li.addEventListener("click", (e) => this.handleTodoClick(e));

    return li;
  }

  // Show message when no todos exist
  showEmptyState() {
    this.todoList.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>No tasks yet!</h3>
            <p>Add a task above to get started.</p>
        </div>
    `;
  }

  // Handle clicks on todo items (complete, edit, delete buttons)
  handleTodoClick(e) {
    const action = e.target.dataset.action;
    const todoId = parseInt(e.target.dataset.id);

    // Prevent the click if no action is specified
    if (!action || !todoId) return;

    // Handle different actions
    switch (action) {
      case "toggle":
        this.toggleTodo(todoId);
        break;
      case "edit":
        console.log("Edit todo:", todoId);
        // We'll implement this in the next step
        break;
      case "delete":
        this.deleteTodo(todoId);
        break;
    }
  }

  // Update the stats display
  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((todo) => todo.completed).length;

    this.totalCount.textContent = `${total} task${
      total !== 1 ? "s" : ""
    } total`;
    this.completedCount.textContent = `${completed} completed`;
  }
  // Toggle todo completion status
  toggleTodo(todoId) {
    // Find the todo in our array
    const todo = this.todos.find((todo) => todo.id === todoId);

    if (!todo) {
      console.error("Todo not found:", todoId);
      return;
    }

    // Toggle the completed status
    todo.completed = !todo.completed;

    // Add completion timestamp
    if (todo.completed) {
      todo.completedAt = new Date();
    } else {
      delete todo.completedAt; // Remove completion timestamp
    }

    // Re-render the todos and update stats
    this.renderTodos();
    this.updateStats();

    // Show feedback to user
    this.showToast(
      todo.completed ? "Task completed! ✓" : "Task marked as incomplete"
    );

    console.log("Toggled todo:", todo);
  }

  // Delete a todo
  deleteTodo(todoId) {
    // Find the todo to get its text for confirmation
    const todo = this.todos.find((todo) => todo.id === todoId);

    if (!todo) {
      console.error("Todo not found:", todoId);
      return;
    }

    // Show confirmation dialog
    const confirmMessage = `Are you sure you want to delete "${todo.text}"?`;

    if (!confirm(confirmMessage)) {
      return; // User cancelled
    }

    // Remove the todo from our array
    this.todos = this.todos.filter((todo) => todo.id !== todoId);

    // Re-render the todos and update stats
    this.renderTodos();
    this.updateStats();

    // Show feedback to user
    this.showToast("Task deleted successfully", "error");

    console.log("Deleted todo:", todo);
  }

  // Show toast notification to user
  showToast(message, type = "success") {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add to page
    document.body.appendChild(toast);

    // Show toast with animation
    setTimeout(() => toast.classList.add("show"), 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // Helper function to find todo by ID
  findTodoById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  // Get todos statistics
  getTodoStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((todo) => todo.completed).length;
    const pending = total - completed;

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}

// Initialize the Todo App when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new TodoApp();
});
