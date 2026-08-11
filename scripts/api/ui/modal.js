const addBox = document.getElementById("addBox");
const deleteBtn = document.getElementById("deleteBtn");
const taskModal = document.getElementById("taskModal");
const confirmModal = document.getElementById("confirmModal");
const closeBtn = document.getElementById("close");
const confirmCancel = document.getElementById("confirmCancel");
const confirmDel = document.getElementById("confirmDelete");

const taskDetailsModal = document.getElementById("taskDetailsModal");

export function showTaskModal() {
    if (!addBox || !taskModal) return;

    const openModal = () => {
        taskModal.classList.remove("hidden");
        taskModal.classList.add("flex");
    };

    const closeModal = () => {
        taskModal.classList.add("hidden");
        taskModal.classList.remove("flex");
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    };

    addBox.addEventListener("click", openModal);

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    taskModal.addEventListener("click", (e) => {
        if (e.target === taskModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !taskModal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

export function showConfirmDeleteModal() {
    const openModal = () => {
        confirmModal.classList.remove("hidden");
        confirmModal.classList.add("flex");
    };

    const closeModal = () => {
        confirmModal.classList.add("hidden");
        confirmModal.classList.remove("flex");
    };

    const deleteBtn = document.getElementById("deleteBtn");
    const deleteBtnMobile = document.getElementById("deleteBtnMobile");

    if (deleteBtn) deleteBtn.addEventListener("click", openModal);
    if (deleteBtnMobile) deleteBtnMobile.addEventListener("click", openModal);
    
    if (confirmCancel) confirmCancel.addEventListener("click", closeModal);
    if (confirmDel) confirmDel.addEventListener("click", closeModal);
}

// Mobile feature
export function showTaskDetailsModal(task) {
    const editTitleMobile = document.getElementById("editTitleMobile");
    const editDescriptionMobile = document.getElementById("editDescriptionMobile");
    const editDueDateMobile = document.getElementById("editDueDateMobile");
    const editListTypeMobile = document.getElementById("editListTypeMobile");
    const taskStatusMobile = document.getElementById("taskStatusMobile");

    if (editTitleMobile) editTitleMobile.value = task.title;
    if (editDescriptionMobile) editDescriptionMobile.value = task.task_description;
    if (editDueDateMobile) editDueDateMobile.value = task.due_date;
    if (editListTypeMobile) editListTypeMobile.value = task.list_type;
    if (taskStatusMobile) taskStatusMobile.innerHTML = `Status: ${task.task_status}`;

    if (taskDetailsModal) {
        taskDetailsModal.classList.remove("hidden");
        taskDetailsModal.classList.add("flex");
    }
}

if (taskDetailsModal) {
    taskDetailsModal.addEventListener("click", (e) => {
        if (e.target === taskDetailsModal) {
            taskDetailsModal.classList.add("hidden");
            taskDetailsModal.classList.remove("flex");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !taskDetailsModal.classList.contains("hidden")) {
            taskDetailsModal.classList.add("hidden");
            taskDetailsModal.classList.remove("flex");
        }
    });
}