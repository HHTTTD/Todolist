let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task";
        li.innerHTML = `
            <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${index})">
            <span class="${task.done ? 'done' : ''}">${task.text}</span>
            <button onclick="editTask(${index})">แก้ไข</button>
            <button onclick="deleteTask(${index})">ลบ</button>
        `;
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim()) {
        tasks.push({ text: input.value, done: false });
        saveTasks();
        renderTasks();
        input.value = "";
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("แก้ไขข้อความ:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

renderTasks();
