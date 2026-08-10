import { updateTask } from "../tasksApi.js";
// import { showTaskDetailsModal } from "/scripts/api/ui/modal.js";

export async function renderTasks(task, taskContainer, isEditing, onDelete) {
    const taskStatus = document.getElementById("taskStatus");
    const card = document.createElement("div");
    card.classList.add('card', 'flex', 'flex-col', 'gap-2', 'md:flex-row', 'text-sm', 'md:text-lg', 'px-5', 'py-3', 'px-5', 'rounded-lg', 'items-center', 'justify-between', 'bg-white', 'shadow-md', 'cursor-pointer', 'shadow-blue-500/50');

    card.addEventListener("click", (e)=> {
        e.preventDefault();
        
        taskStatus.innerHTML = `Status: ${task.task_status}`;
        isEditing(task);
        onDelete(task);
    });

    const cardLeft = document.createElement("div");
    cardLeft.classList.add('flex', 'items-center', 'gap-2', 'md:gap-3');

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = (task.task_status || "pending").toLowerCase() === "completed";

    const updateBorder = (isCompleted) => {
        card.classList.remove('border-l-8', 'border-orange-400', 'border-green-600');

        if (isCompleted) {
            card.classList.add('border-l-8', 'border-green-600');
        } else {
            card.classList.add('border-l-8', 'border-orange-400');
        }
    };

    updateBorder(checkbox.checked);

    checkbox.addEventListener("click", async (event)=> {
        event.stopPropagation();

        const isChecked = event.target.checked;
        const newStatus = isChecked ? "completed" : "pending";

        updateBorder(isChecked);

        const data = await updateTask({id: task.id, newStatus: newStatus});

        if(data && data.success) {  
            task.task_status = newStatus;   
            console.log(data.message);
        } else {
            event.target.checked = !isChecked;
            updateBorder(!isChecked);
            console.log(data.message);
        }

        console.log(`Task id: ${task.id}. Checked? -> ` + isChecked);
    });

    cardLeft.appendChild(checkbox);

    const listTypeBadge = document.createElement("div");
    listTypeBadge.textContent = task.list_type;
    const categoryClass = task.list_type ? task.list_type.toLowerCase() : '';
    listTypeBadge.classList.add('task-list-type', categoryClass, 'rounded-md', 'px-3', 'text-xs', 'md:text-sm');

    cardLeft.appendChild(listTypeBadge);

    const dueDateBadge = document.createElement("div");
    dueDateBadge.innerHTML = ` 
        <i class="fa-solid fa-calendar-days"></i> ${task.due_date} 
    `;

    cardLeft.appendChild(dueDateBadge);

    card.appendChild(cardLeft);

    const cardMiddle = document.createElement("div");
    cardMiddle.classList.add('flex', 'items-center', 'font-medium');

    const taskTitle = document.createElement("span");
    taskTitle.textContent = task.title;

    cardMiddle.appendChild(taskTitle);
    
    card.appendChild(cardMiddle);

    const cardRight = document.createElement("div");

    const taskDetails = document.createElement("div");
    taskDetails.innerHTML = `<i class="fa-solid fa-circle-chevron-right"></i>`;

    cardRight.appendChild(taskDetails);

    card.appendChild(cardRight);

    taskContainer.prepend(card);
}