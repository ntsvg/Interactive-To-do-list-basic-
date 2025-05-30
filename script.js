// Default tasks for each category
const defaultTasks = {
  personal: ['Meditate for 15 minutes', 'Call a friend', 'Read a book chapter'],
  shopping: ['Buy groceries', 'Order a new pair of shoes', 'Check discounts on electronics'],
  coding: ['Complete JavaScript exercises', 'Debug the to-do list app', 'Learn about CSS Grid'],
  health: ['Drink 8 glasses of water', 'Go for a 30-minute walk', 'Prepare a healthy meal'],
  work: ['Reply to emails', 'Attend the team meeting', 'Work on the project report']
};

let currentCategory = ""; // Track the selected category

// Show Tasks Based on Selected Category
function showTasks(category) {
  currentCategory = category; // Set the selected category
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)} Tasks</h2>`;

  // Add default tasks for the selected category
  if (defaultTasks[category]) {
    const taskList = document.createElement('ul');
    defaultTasks[category].forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <span>${task}</span>
        <button onclick="markTaskAsCompleted(this)">Complete</button>
        <button onclick="deleteTask(this)">Delete</button>
      `;
      taskList.appendChild(taskItem);
    });
    tasksContainer.appendChild(taskList);
  } else {
    tasksContainer.innerHTML += '<p>No default tasks available for this category.</p>';
  }
}

// Add a New Task
function addTask() {
  const taskName = document.getElementById('new-task-name').value;
  const taskDeadline = document.getElementById('task-deadline').value;

  if (!taskName) {
    alert('Please enter a task name.');
    return;
  }

  if (!currentCategory) {
    alert('Please select a category to add the task.');
    return;
  }

  if (!defaultTasks[currentCategory]) {
    defaultTasks[currentCategory] = [];
  }
  defaultTasks[currentCategory].push(taskName);

  // Refresh the task list for the current category
  showTasks(currentCategory);
}

// Mark a Task as Completed
function markTaskAsCompleted(button) {
  const taskItem = button.parentElement;
  taskItem.classList.add('completed');
  button.disabled = true; // Disable the "Complete" button
  updateStats();
  showCelebration(); // Trigger the celebration
}

// Delete a Task
function deleteTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  updateStats();
}

// Update Statistics
function updateStats() {
  const totalTasks = document.querySelectorAll('.task-item').length;
  const completedTasks = document.querySelectorAll('.task-item.completed').length;

  document.getElementById('total-completed').textContent = completedTasks;
  document.getElementById('total-credits').textContent = completedTasks * 10; // Earn 10 credits per completed task
}

// Celebration for Task Completion
function showCelebration() {
  const celebration = document.getElementById('celebration');
  celebration.style.display = 'block';

  setTimeout(() => {
    celebration.style.display = 'none';
  }, 2000); // Hide after 2 seconds
}