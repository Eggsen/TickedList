import { readTasks } from "../tasksApi.js";

export async function filterByListType(listType) {
    try{
        const data = await readTasks();

        if(data && data.success) {
            const filterValue = (listType || "").toLowerCase();
            
            if (filterValue === "all" || filterValue === "show all") {
                return data.tasks;
            }

            return data.tasks.filter(task => (task.list_type || "").toLowerCase() === filterValue);
        }
        return [];
    } catch(error) {
        console.log("Error filtering task. " + error);
    }
}

export async function filterByDueDate(order) {
    try{
        const data = await readTasks();

        if(data && data.success) {
            let sortedTask = [...data.tasks];
            if(order === "latest") {
                sortedTask.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
                return sortedTask;
            } else if(order === "oldest") {
                sortedTask.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                return sortedTask;
            } else if(order === "recent") {
                return sortedTask.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
            }
        }
        return [];
    } catch(error) {
        console.log("Error filtering task. " + error);
    }
}

export async function filterByStatus(status) {
    try{
        const data = await readTasks();

        if(data && data.success) {
            const filterValue = (status || "").toLowerCase();

            if(filterValue === "all") {
                return data.tasks;
            }

            return data.tasks.filter(task => (task.task_status || "").toLowerCase() === filterValue);
        }
        return[];
    } catch(error) {
        console.log("Error filtering task. " + error);
    }
}