// Define an array to store tasks
let tasks = [];

// Define a variable to store the current filter status
let currentFilter = "all";

// Function to add a new task
function addTask(title, description) {
    tasks.push({ title, description, completed: false });
}

// Function to render tasks on the webpage
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    // Get tasks based on the current filter status
    const filteredTasks = filterTasks(currentFilter);

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox" id="task${index}" ${task.completed ? "checked" : ""}>
            <label for="task${index}">${task.title}</label>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Event listener for the checkbox to mark task as complete
        const checkbox = taskItem.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            renderTasks();
        });

        // Event listener for the edit button
        const editButton = taskItem.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
            const newTitle = prompt("Enter new title:", task.title);
            if (newTitle !== null && newTitle.trim() !== "") {
                tasks[index].title = newTitle.trim();
                renderTasks();
            }
        });

        // Event listener for the delete button
        const deleteButton = taskItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });
    });
}

// Function to filter tasks based on status
function filterTasks(status) {
    switch (status) {
        case "active":
            return tasks.filter(task => !task.completed);
        case "completed":
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Event listener for the task form submission
document.getElementById("task-form").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-description").value.trim();
    if (title !== "") {
        addTask(title, description);
        renderTasks();
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
    } else {
        alert("Please enter a task title.");
    }
});

// Event listener for the filter buttons
document.querySelectorAll(".filter-container button").forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all filter buttons
        document.querySelectorAll(".filter-container button").forEach(btn => btn.classList.remove("active"));
        // Add active class to the clicked filter button
        button.classList.add("active");
        // Update the current filter status
        currentFilter = button.id.split("-")[1];
        // Render tasks based on the updated filter status
        renderTasks();
    });
});

// Function to toggle dark mode
function toggleDarkMode() {
    const container = document.getElementById("container");
    container.classList.toggle("dark-mode");
}

// Event listener for toggle mode button
document.getElementById("toggle-mode").addEventListener("click", toggleDarkMode);

// Initial rendering of tasks
renderTasks();
