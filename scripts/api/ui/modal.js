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

    deleteBtn.addEventListener("click", openModal);
    
    confirmCancel.addEventListener("click", closeModal);
    confirmDel.addEventListener("click", closeModal);

}

export function showTaskDetailsModal(task) {
    document.getElementById("editTitle").value = task.title;
    document.getElementById("editDescription").value = task.task_description;
    document.getElementById("editDueDate").value = task.due_date;
    document.getElementById("editListType").value = task.list_type;
    
    taskDetailsModal.classList.remove("hidden");
    taskDetailsModal.classList.add("flex");
}