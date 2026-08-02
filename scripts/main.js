import { loginUser, logoutUser, signupUser } from "./api/auth/authApi.js";
import { createTask, deleteTask, readTasks, updateTask } from "./api/tasksApi.js";
import { showConfirmDeleteModal, showTaskModal } from "./api/ui/modal.js";
import { renderTasks } from "./api/ui/tasksUi.js";
import { filterByDueDate, filterByListType } from "./api/utils/filterTask.js";
import { clearForm, generateRandomQuotes, greet, refreshTasks } from "./api/utils/textsHelper.js";

const taskModal = document.getElementById("taskModal");
const notice = document.getElementById("notice");
const info = document.getElementById("info");
const tasksContainer = document.querySelector(".tasks-container");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logout = document.getElementById("logout");
const listTypeSelect = document.getElementById("listTypeSelect");
const dateSelect = document.getElementById("dateSelect");

const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");
const confirmDeleteBtn = document.getElementById("confirmDelete");

let isEditing = false;
let editingID = null;
let deleteID = null;

if (document.getElementById("greeting")) {
    greet();
}

if (document.getElementById("taskModal")) {
    showTaskModal();
}

if(document.getElementById("quote")) {
    generateRandomQuotes();
}

if(document.getElementById("deleteBtn")) {
    showConfirmDeleteModal();
}

// Auths
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const data = await signupUser({firstName, lastName, email, password, confirmPassword});

        if (data && data.success) {
            window.location.href = "/index.html";
        } else if (data) {
            notice.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${data.message}`;
            notice.style.padding = "14px";
        }
    });
}

if(loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = await loginUser({email, password});

        if(data && data.success) {
            window.location.href = "/index.html";
        } else if (data) {
            notice.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${data.message}`;
            notice.style.padding = "14px";
        }
    });
}

if(logout) {
    logout.addEventListener("click", async (e)=> {
        e.preventDefault();

        const data = await logoutUser();

        if(data && data.success) {
            window.location.href = "/pages/auth/login.html";
            console.log(data.message);
        }
    });
}

if(createBtn) {
    createBtn.addEventListener("click", async (e)=> {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const taskDescription = document.getElementById("description").value;
        const taskStatus = "pending";
        const listType = document.getElementById("addListType").value;
        const dueDate = document.getElementById("dueDate").value;
        
        const data = await createTask({title, taskDescription, taskStatus, listType, dueDate});

        if(data && data.success) {
            refreshTasks();
            await initTasks();
            taskModal.classList.add("hidden");
            taskModal.classList.remove("flex");
            clearForm();
        } else {
            notice.textContent = data.message;
        }
    });
}

if(editBtn) {
    editBtn.addEventListener("click", async (e)=> {
        e.preventDefault();

        const title = document.getElementById("editTitle");
        const taskDescription = document.getElementById("editDescription");
        const listType = document.getElementById("editListType");
        const dueDate = document.getElementById("editDueDate");

        if(!isEditing) {
            title.readOnly = false;
            title.style.backgroundColor = "white";
            taskDescription.readOnly = false;
            listType.disabled = false;
            dueDate.readOnly = false;

            editBtn.textContent = "Save Changes";
            isEditing = true;
        } else {
            const editTitle = title.value;
            const editDescription = taskDescription.value;
            const editListType = listType.value;
            const editDueDate = dueDate.value;

            const data = await updateTask({id: editingID, editTitle, editDescription, editListType, editDueDate});

            if(data && data.success) {
                title.readOnly = true;
                title.style.background = "none";
                taskDescription.readOnly = true;
                listType.readOnly = true;
                dueDate.readOnly = true;
                refreshTasks();
                await initTasks();
                clearForm();
                editBtn.textContent = "Edit";
                isEditing = false;
                console.log(data.message);
            } else {
                console.log(data.message);
            }
        }
    });
}

if(confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", async (e)=> {
        e.preventDefault();

        if(deleteID !== null) {
            const data = await deleteTask(deleteID);

            if(data && data.success) {
                deleteID = null;
                refreshTasks();
                await initTasks();
                clearForm();
                console.log(data.message);
            } else {
                console.log(data.message);
            }
        }
    });
}

if(tasksContainer) {
    initTasks();
}

if (listTypeSelect) {
    listTypeSelect.addEventListener("change", (e)=> {
        displayFilteredListType(e.target.value);
    });
}

if(dateSelect) {
    dateSelect.addEventListener("change", (e)=> {
        displayFilteredDate(e.target.value);
    });
}

async function initTasks() {
    const data = await readTasks();

    if (data && data.success && Array.isArray(data.tasks)) {
        data.tasks.forEach(task => renderTasks(task, tasksContainer, handleEdit, handleDelete));
    } else {
        info.innerHTML = `<i class="fa-regular fa-face-grin-stars"></i> Awesome! You completed all Your tasks.`;
        console.log(data.message);
    }

}

async function handleEdit(task) {
    document.getElementById("editTitle").value = task.title;
    document.getElementById("editDescription").value = task.task_description;
    document.getElementById("editDueDate").value = task.due_date;
    document.getElementById("editListType").value = task.list_type;
    editingID = task.id;
}

async function handleDelete(task) {
    deleteID = task.id;
}

async function displayFilteredListType(listType) {
    const filteredTasks = await filterByListType(listType);

    refreshTasks(); 

    if (filteredTasks.length > 0) {
        info.innerHTML = "";
        filteredTasks.forEach(task => 
            renderTasks(task, tasksContainer, handleEdit, handleDelete)
        );
    } else {
        info.innerHTML = `<i class="fa-regular fa-face-grin-stars"></i> No tasks found.`;
    }
}

async function displayFilteredDate(order) {
    const filteredTasks = await filterByDueDate(order);

    refreshTasks();

    if (filteredTasks.length > 0) {
        info.innerHTML = "";
        filteredTasks.forEach(task => 
            renderTasks(task, tasksContainer, handleEdit, handleDelete)
        );
    } else {
        info.innerHTML = `<i class="fa-regular fa-face-grin-stars"></i> No tasks found.`;
    }
}