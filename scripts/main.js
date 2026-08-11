import { loginUser, logoutUser, signupUser } from "./api/auth/authApi.js";
import { updatePassword, updateProfile } from "./api/profileApi.js";
import { createTask, deleteTask, readTasks, updateTask } from "./api/tasksApi.js";
import { showConfirmDeleteModal, showTaskModal } from "./api/ui/modal.js";
import { renderTasks } from "./api/ui/tasksUi.js";
import { filterByDueDate, filterByListType, filterByStatus } from "./api/utils/filterTask.js";
import { clearForm, displayPersonalInfo, generateRandomQuotes, greet, refreshTasks } from "./api/utils/textsHelper.js";
import { toggleSidebar } from "./api/utils/transitions.js";

const taskModal = document.getElementById("taskModal");
const notice = document.getElementById("notice");
const info = document.getElementById("info");
const tasksContainer = document.querySelector(".tasks-container");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logout = document.getElementById("logout");
const statusSelect = document.getElementById("statusSelect");
const listTypeSelect = document.getElementById("listTypeSelect");
const dateSelect = document.getElementById("dateSelect");

const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const editInfo = document.getElementById("editInfo");
const updatePassBtn = document.getElementById("updatePassBtn");

let isEditing = false;
let isEditingProfile = false;
let isEditingPassword = false;
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

if(document.getElementById("collapsableSidebar")) {
    toggleSidebar();
}

if(document.getElementById("personalInfo")) {
    displayPersonalInfo();
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
            window.location.href = "/pages/auth/login.html";
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
            window.location.href = "/index.php";
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

// Tasks
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

if(statusSelect) {
    statusSelect.addEventListener("change", (e)=> {
        displayFilteredStatus(e.target.value);
    });
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

// Users
if(editInfo) {
    editInfo.addEventListener("click", async (e)=> {
        e.preventDefault();

        const editInfoIcon = document.getElementById("editInfoIcon");
        const firstName = document.getElementById("editFirstName");
        const lastName = document.getElementById("editLastName");
        const email = document.getElementById("editEmail");
        const contactNum = document.getElementById("editContactNum");
        const birthDate = document.getElementById("editBirthDate");

        if(!isEditingProfile) {
            firstName.readOnly = false;
            lastName.readOnly = false;
            email.readOnly = false;
            contactNum.readOnly = false;
            birthDate.readOnly = false;
            isEditingProfile = true;

            editInfoIcon.classList.remove("fa-pen-to-square");
            editInfoIcon.classList.add("fa-floppy-disk");

            console.log("edit clicked");
        } else {
            const editFirstName = firstName.value;
            const editLastName = lastName.value;
            const editEmail = email.value;
            const editContactNum = contactNum.value;
            const editBirthDate = birthDate.value;

            const data = await updateProfile({editFirstName, editLastName, editEmail, editContactNum, editBirthDate});

            if(data && data.success) {
                firstName.readOnly = true;
                lastName.readOnly = true;
                email.readOnly = true;
                contactNum.readOnly = true;
                birthDate.readOnly = true;
                isEditingProfile = false;
                
                editInfoIcon.classList.add("fa-pen-to-square");
                editInfoIcon.classList.remove("fa-floppy-disk");

                console.log("save clicked");
                console.log(data.message);
            } else {
                console.log(data ? data.message : "Failed to update profile.");
            }
        }
    });
}

if(updatePassBtn) {
    updatePassBtn.addEventListener("click", async (e)=> {
        e.preventDefault();

        const currentPassword = document.getElementById("enterCurrentPassword");
        const newPassword = document.getElementById("enterNewPassword");
        
        if(!isEditingPassword) {
            currentPassword.readOnly = false;
            currentPassword.placeholder = "";
            newPassword.readOnly = false;
            newPassword.placeholder = "";

            isEditingPassword = true;
            updatePassBtn.classList.add('bg-yellow-400');

            console.log("Editing password...");
        } else {
            const enterCurrentPassword = currentPassword.value;
            const enterNewPassword = newPassword.value;

            const data = await updatePassword({enterCurrentPassword, enterNewPassword});

            if(data && data.success) {
                currentPassword.readOnly = true;
                currentPassword.placeholder = "Enter current password";
                newPassword.readOnly = true;
                newPassword.placeholder = "Enter new password";

                currentPassword.value = "";
                newPassword.value = "";
                
                isEditingPassword = false;
                updatePassBtn.classList.remove('bg-yellow-400');

                notice.textContent = data.message;
                notice.classList.remove("text-red-600");
                notice.classList.add("text-green-600");
                console.log("Save clicked, password updated.");
                console.log(data.message);
            } else {
                notice.textContent = data.message;
                console.log(data.message);
            }
        }
    });
}

// Inits
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

async function displayFilteredStatus(status) {
    const filteredTasks = await filterByStatus(status);

    refreshTasks();

    if(filteredTasks.length > 0) {
        info.innerHTML = "";
        filteredTasks.forEach(task => renderTasks(task, tasksContainer, handleEdit, handleDelete));
    } else {
        info.innerHTML = `<i class="fa-regular fa-face-grin-stars"></i> No tasks found.`;
    }
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