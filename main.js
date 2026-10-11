const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const priorityInput = document.querySelector("#priority");
const todoList = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const deleteAllButton = document.querySelector("#deleteAll");
const dayElement = document.querySelector("#day");
const dateElement = document.querySelector("#date");

const now = new Date();
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const day = days[now.getDay()];
const date = now.toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

dayElement.textContent = day;
dateElement.textContent = date;

let tasks = [];

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = taskInput.value.trim();
  const priority = priorityInput.value;

  if (title === "") {
    return;
  }

  const task = {
    id: Date.now(),
    title: title,
    priority: priority,
    completed: false,
  };

  tasks.push(task);

  renderTasks();

  taskInput.value = "";
  priorityInput.value = "Low";
});

function renderTasks() {
  todoList.textContent = "";
  doneList.textContent = "";

  tasks.forEach(function (task) {
    const taskElement = document.createElement("div");

    taskElement.classList.add("task");
    taskElement.innerHTML = 
    `
      <input
        type="checkbox"
        class="task-checkbox"
      >
      <div class="task-info">
        <div class="task-title">${task.title}</div>
        <div class="task-priority">Priority: ${task.priority}</div>
      </div>
      <div id="time">${day} ${date}</div>
      <button class="task-delete">Delete</button>
    `;

    const priorityElement = taskElement.querySelector(".task-priority");

    if (task.priority === "Low") {
      priorityElement.classList.add("priority-low");
    } else if (task.priority === "Medium") {
      priorityElement.classList.add("priority-medium");
    } else {
      priorityElement.classList.add("priority-high");
    }

    const checkbox = taskElement.querySelector(".task-checkbox");

    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const deleteButton = taskElement.querySelector(".task-delete");

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
      return item.id !== task.id;
      });

      renderTasks();
    });

    if (task.completed) {
      doneList.appendChild(taskElement);
    } else {
      todoList.appendChild(taskElement);
    }
  });
}

deleteAllButton.addEventListener("click", function () {
  tasks = [];

  renderTasks();
});
