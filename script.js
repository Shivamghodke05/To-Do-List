const input = document.querySelector(".textBox");
const add = document.querySelector(".add");
const output = document.querySelector(".task1");
const addTask = document.querySelector(".toDoList");
const clear = document.querySelector(".clear");

// Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", loadTasks);

add.addEventListener("click", () => {
  if (input.innerText.trim() !== "") {
    const div = document.createElement("div");
    div.classList.add("inner-div");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox"; // small typo fixed
    checkBox.classList.add("checkBox");
    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        task1.style.textDecoration = "line-through";
        task1.style.color = "#888";
      } else {
        task1.style.textDecoration = "none";
        task1.style.color = "black";
      }
      updateLocalStorage();
    });

    const task1 = document.createElement("p");
    task1.classList.add("task");
    task1.innerText = input.innerText.trim();

    const deleteTask = document.createElement("button");
    deleteTask.classList.add("delete");

    const img = document.createElement("img");
    img.src = "delete.png";
    img.alt = "delete";
    img.style.width = "35px";
    img.style.display = "flex";

    deleteTask.appendChild(img);

    deleteTask.addEventListener("click", () => {
      div.remove();
      updateLocalStorage();
    });

    div.appendChild(task1);
    div.appendChild(deleteTask);
    div.appendChild(checkBox);

    addTask.appendChild(div);
    input.innerText = "";

    updateLocalStorage();
  } else {
    alert("This field cannot be empty!");
  }

  clear.addEventListener("click", () => {
    document.querySelectorAll(".inner-div").forEach((task) => task.remove());
    localStorage.removeItem("tasks");
  });
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    add.click();
    event.preventDefault();
  }
});

// load tasks on page load
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskObj) => {
    const div = document.createElement("div");
    div.classList.add("inner-div");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkBox");
    checkBox.checked = taskObj.checked;

    const task1 = document.createElement("p");
    task1.classList.add("task");
    task1.innerText = taskObj.text;

    if (taskObj.checked) {
      task1.style.textDecoration = "line-through";
      task1.style.color = "#888";
    }

    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        task1.style.textDecoration = "line-through";
        task1.style.color = "#888";
      } else {
        task1.style.textDecoration = "none";
        task1.style.color = "black";
      }
      updateLocalStorage();
    });

    const deleteTask = document.createElement("button");
    deleteTask.classList.add("delete");

    const img = document.createElement("img");
    img.src = "delete.png";
    img.alt = "delete";
    img.style.width = "35px";
    img.style.display = "flex";

    deleteTask.appendChild(img);

    deleteTask.addEventListener("click", () => {
      div.remove();
      updateLocalStorage();
    });

    div.appendChild(task1);
    div.appendChild(deleteTask);
    div.appendChild(checkBox);

    addTask.appendChild(div);
  });
}

// update tasks in localStorage
function updateLocalStorage() {
  const allTasks = document.querySelectorAll(".inner-div");
  let tasks = [];
  allTasks.forEach((div) => {
    const p = div.querySelector(".task");
    const checkbox = div.querySelector("input[type=checkbox]");
    tasks.push({
      text: p.innerText,
      checked: checkbox.checked,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
