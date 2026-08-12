import { loginUser, logoutUser, signupUser } from "./api/auth/authApi.js";
import { updateUserInfo, updateUserPassword } from "./api/usersApi.js";
import { createTask, deleteTask, readTasks, updateTask } from "./api/tasksApi.js";
import { showConfirmDeleteModal, showTaskModal } from "./api/ui/modal.js";
import { renderTasks } from "./api/ui/tasksUi.js";
import { filterByDueDate, filterByListType, filterByStatus } from "./api/utils/filterTask.js";
import { clearForm, generateRandomQuotes, greet, refreshTasks, displayPersonalInfo} from "./api/utils/textsHelper.js";
import { toggleSidebar } from "./api/utils/transitions.js";
import { initDarkMode, toggleDarkMode } from "./api/utils/darkMode.js";

initDarkMode();

const taskModal = document.getElementById("taskModal");
const taskDetailsModal = document.getElementById("taskDetailsModal");
const notice = document.getElementById("notice");
const newPassNotice = document.getElementById("newPassNotice");
const newInfoNotice = document.getElementById("newInfoNotice");
const alertBox = document.getElementById("alertBox");
const info = document.getElementById("info");
const tasksContainer = document.querySelector(".tasks-container");
const editInfo = document.getElementById("editInfo");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logout = document.getElementById("logout");
const statusSelect = document.getElementById("statusSelect");
const listTypeSelect = document.getElementById("listTypeSelect");
const dateSelect = document.getElementById("dateSelect");

const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");
const editBtnMobile = document.getElementById("editBtnMobile");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const editPersonal = document.getElementById("editPersonal");
const updatePassBtn = document.getElementById("updatePassBtn");

let isEditing = false;
let isEditingProfile = false;
let isEditingPassword = false;
let editingID = null;
let deleteID = null;

if (document.getElementById("greeting")) {
    greet();
}

const themeSelect = document.getElementById("themeSelect");
if (themeSelect) {
    // Pre-select the saved value
    const saved = localStorage.getItem("theme") || "system";
    themeSelect.value = saved;

    themeSelect.addEventListener("change", () => {
        const val = themeSelect.value;
        if (val === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else if (val === "light") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            localStorage.removeItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    });
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

if(document.getElementById("editInfo")) {
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

// CRUD listeners (Tasks)
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

            if(alertBox) {
                document.getElementById("alertAction").textContent = "Task created successfully!";
                document.getElementById("alertDesc").textContent = "A new task has been added to your account.";

                alertBox.classList.remove("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                alertBox.classList.add("visible", "opacity-100", "translate-y-0", "pointer-events-auto");

                setTimeout(()=> {
                    alertBox.classList.remove("visible", "opacity-100", "translate-y-0", "pointer-events-auto");
                    alertBox.classList.add("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                }, 3000);
            }

            clearForm();
        } else {
            notice.textContent = data.message;
        }
    });
}

if(editBtn) {
    editBtn.addEventListener("click", (e) => handleEditSave(e, editBtn, false));
}

if(editBtnMobile) {
    editBtnMobile.addEventListener("click", (e) => handleEditSave(e, editBtnMobile, true));
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

                if(alertBox) {
                document.getElementById("alertAction").textContent = "Task deleted successfully!";
                document.getElementById("alertDesc").textContent = "The task has been deleted.";

                alertBox.classList.remove("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                alertBox.classList.add("visible", "opacity-100", "translate-y-0", "pointer-events-auto");

                setTimeout(()=> {
                    alertBox.classList.remove("visible", "opacity-100", "translate-y-0", "pointer-events-auto");
                    alertBox.classList.add("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                }, 3000);

            }
            } else {
                console.log(data.message);
            }
        }
    });
}

// Users
if(editPersonal) {
    editPersonal.addEventListener("click", async (e)=> {
        e.preventDefault();

        const firstName = document.getElementById("editFirstName");
        const lastName = document.getElementById("editLastName");
        const email = document.getElementById("editEmail");
        const contactNo = document.getElementById("editContactNo");
        const birthdate = document.getElementById("editBirthdate");

        const editIcon = document.getElementById("editIcon");
        
        if(!isEditingProfile) {
            firstName.readOnly = false;
            lastName.readOnly = false;
            email.readOnly = false;
            contactNo.readOnly = false;
            birthdate.readOnly = false;

            isEditingProfile = true;
            editIcon.classList.remove("fa-pen-to-square");
            editIcon.classList.add("fa-floppy-disk");
        } else {
            const editFirstName = firstName.value;
            const editLastName = lastName.value;
            const editEmail = email.value;
            const editContactNo = contactNo.value;
            const editBirthdate = birthdate.value;
            
            const data = await updateUserInfo({editFirstName, editLastName, editEmail, editContactNo, editBirthdate});
        
            if(data && data.success) {
                firstName.readOnly = true;
                lastName.readOnly = true;
                email.readOnly = true;
                contactNo.readOnly = true;
                birthdate.readOnly = true;

                isEditingProfile = false;
                editIcon.classList.remove("fa-floppy-disk");
                editIcon.classList.add("fa-pen-to-square");

                if(alertBox) {
                    document.getElementById("alertAction").textContent = "Personal Information updated successfully!";
                    document.getElementById("alertDesc").textContent = "Restarting the session is encouraged to apply changes.";

                    alertBox.classList.remove("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                    alertBox.classList.add("visible", "opacity-100", "translate-y-0", "pointer-events-auto");

                    setTimeout(()=> {
                        alertBox.classList.remove("visible", "opacity-100", "translate-y-0", "pointer-events-auto");
                        alertBox.classList.add("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                    }, 6000);
                }

                newInfoNotice.textContent = data.message;
                newInfoNotice.classList.add("text-green-400");
                newInfoNotice.classList.remove("text-red-400");
            } else {
                newInfoNotice.textContent = data.message;
                newInfoNotice.classList.add("text-red-400");
                newInfoNotice.classList.remove("text-green-400");
            }
        }
    });
}
  
if(updatePassBtn) {
   updatePassBtn.addEventListener("click", async (e)=> {
        e.preventDefault();
        
        const currentPassword = document.getElementById("currentPassword");
        const newPassword = document.getElementById("newPassword");
        const confirmNewPassword = document.getElementById("confirmNewPassword");

       if(!isEditingPassword) {
           currentPassword.readOnly = false;
           newPassword.readOnly = false;
           confirmNewPassword.readOnly = false;

           isEditingPassword = true;
           updatePassBtn.classList.remove("bg-yellow-400");
           updatePassBtn.classList.add("bg-white");
       } else {
           const editCurrentPassword = currentPassword.value;
           const editNewPassword = newPassword.value;
           const editConfirmNewPassword = confirmNewPassword.value;

           const data = await updateUserPassword({editCurrentPassword, editNewPassword, editConfirmNewPassword});
       
           if(data && data.success) {
               currentPassword.readOnly = true;
               newPassword.readOnly = true;
               confirmNewPassword.readOnly = true;

               currentPassword.value = "";
               newPassword.value = "";
               confirmNewPassword.value = "";

               if(alertBox) {
                    document.getElementById("alertAction").textContent = "Password updated successfully!";
                    document.getElementById("alertDesc").textContent = "Restarting the session is encouraged to apply changes.";

                    alertBox.classList.remove("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                    alertBox.classList.add("visible", "opacity-100", "translate-y-0", "pointer-events-auto");

                    setTimeout(()=> {
                        alertBox.classList.remove("visible", "opacity-100", "translate-y-0", "pointer-events-auto");
                        alertBox.classList.add("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                    }, 6000);
                }
               
               isEditingPassword = false;
               updatePassBtn.classList.add("bg-yellow-400");
               updatePassBtn.classList.remove("bg-white");

               newPassNotice.textContent = data.message;
               newPassNotice.classList.remove("text-red-600/50");
               newPassNotice.classList.add("text-green-600/50");
           } else {
               newPassNotice.textContent = data.message;
               newPassNotice.classList.add("text-red-600/50");
               newPassNotice.classList.remove("text-green-600/50");
           }
       }
   });
} 

if(tasksContainer) {
    initTasks();
}

// Filter listeners
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

// Inits
async function initTasks() {
    const data = await readTasks();

    if (data && data.success && Array.isArray(data.tasks)) {
        data.tasks.forEach(task => renderTasks(task, tasksContainer, selectTaskForEdit, handleDelete));
    } else {
        info.innerHTML = `<i class="fa-regular fa-face-grin-stars"></i> Awesome! You completed all Your tasks.`;
        console.log(data.message);
    }

}

// Mobile / smaller screens
async function handleEditSave(e, button, isMobile = false) {
    e.preventDefault();

    const suffix = isMobile ? "Mobile" : "";
    const title = document.getElementById(`editTitle${suffix}`);
    const taskDescription = document.getElementById(`editDescription${suffix}`);
    const listType = document.getElementById(`editListType${suffix}`);
    const dueDate = document.getElementById(`editDueDate${suffix}`);

    if(!isEditing) {
        if (title) {
            title.readOnly = false;
            if (document.documentElement.classList.contains("dark")) {
                title.style.backgroundColor = isMobile ? "rgb(55, 65, 81)" : "white";
            } else {
                title.style.backgroundColor = "white";
            }
        }
        if (taskDescription) taskDescription.readOnly = false;
        if (listType) listType.disabled = false;
        if (dueDate) dueDate.readOnly = false;

        button.textContent = "Save Changes";
        isEditing = true;
    } else {
        const editTitle = title ? title.value : "";
        const editDescription = taskDescription ? taskDescription.value : "";
        const editListType = listType ? listType.value : "";
        const editDueDate = dueDate ? dueDate.value : "";

        const data = await updateTask({id: editingID, editTitle, editDescription, editListType, editDueDate});

        if(data && data.success) {
            if (title) {
                title.readOnly = true;
                title.style.background = "none";
            }
            if (taskDescription) taskDescription.readOnly = true;
            if (listType) listType.disabled = true;
            if (dueDate) dueDate.readOnly = true;

            if(alertBox) {
                document.getElementById("alertAction").textContent = "Task updated successfully!";
                document.getElementById("alertDesc").textContent = "The task has been updated.";

                alertBox.classList.remove("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                alertBox.classList.add("visible", "opacity-100", "translate-y-0", "pointer-events-auto");

                setTimeout(()=> {
                    alertBox.classList.remove("visible", "opacity-100", "translate-y-0", "pointer-events-auto");
                    alertBox.classList.add("invisible", "opacity-0", "-translate-y-4", "pointer-events-none");
                }, 3000);
            }
            
            refreshTasks();
            await initTasks();
            clearForm();
            button.textContent = "Edit";
            isEditing = false;

            if (isMobile && taskDetailsModal) {
                taskDetailsModal.classList.add("hidden");
                taskDetailsModal.classList.remove("flex");
            }
            console.log(data.message);
        } else {
            console.log(data ? data.message : "Error updating task.");
        }
    }
};

// Desktops / Larger screens
async function selectTaskForEdit(task) {
    const editTitle = document.getElementById("editTitle");
    const editDescription = document.getElementById("editDescription");
    const editDueDate = document.getElementById("editDueDate");
    const editListType = document.getElementById("editListType");

    if (editTitle) editTitle.value = task.title;
    if (editDescription) editDescription.value = task.task_description;
    if (editDueDate) editDueDate.value = task.due_date;
    if (editListType) editListType.value = task.list_type;

    const editTitleMobile = document.getElementById("editTitleMobile");
    const editDescriptionMobile = document.getElementById("editDescriptionMobile");
    const editDueDateMobile = document.getElementById("editDueDateMobile");
    const editListTypeMobile = document.getElementById("editListTypeMobile");

    if (editTitleMobile) editTitleMobile.value = task.title;
    if (editDescriptionMobile) editDescriptionMobile.value = task.task_description;
    if (editDueDateMobile) editDueDateMobile.value = task.due_date;
    if (editListTypeMobile) editListTypeMobile.value = task.list_type;

    editingID = task.id;
}

async function handleDelete(task) {
    deleteID = task.id;
}

// Displays
async function displayFilteredStatus(status) {
    const filteredTasks = await filterByStatus(status);

    refreshTasks();

    if(filteredTasks.length > 0) {
        info.innerHTML = "";
        filteredTasks.forEach(task => renderTasks(task, tasksContainer, selectTaskForEdit, handleDelete));
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
            renderTasks(task, tasksContainer, selectTaskForEdit, handleDelete)
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
            renderTasks(task, tasksContainer, selectTaskForEdit, handleDelete)
        );
    } else {
        info.innerHTML = `<i class="fa-regular fa-face-grin-stars"></i> No tasks found.`;
    }
}