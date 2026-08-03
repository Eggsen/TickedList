export async function renderTasks(task, taskContainer, isEditing, onDelete) {
    const card = document.createElement("div");
    card.classList.add('flex', 'text-sm', 'md:text-lg', 'px-5', 'py-3', 'px-5', 'rounded-lg', 'items-center', 'justify-between', 'bg-white', 'shadow-md', 'cursor-pointer', 'shadow-blue-500/50');

    card.addEventListener("click", (e)=> {
        e.preventDefault();

        isEditing(task);
        onDelete(task);
    });

    const cardLeft = document.createElement("div");
    cardLeft.classList.add('flex', 'items-center', 'gap-2', 'md:gap-3');

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    cardLeft.appendChild(checkbox);

    const listTypeBadge = document.createElement("div");
    listTypeBadge.textContent = task.list_type;
    const categoryClass = task.list_type ? task.list_type.toLowerCase() : '';
    listTypeBadge.classList.add('task-list-type', categoryClass, 'rounded-md', 'px-3', 'text-sm');

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