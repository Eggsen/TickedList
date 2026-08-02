// Create tasks
export async function createTask(taskData) {
    try{
        const response = await fetch("/api/crud/createTask.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error connecting to server. " + error);
    }
}

// Read/Scan tasks
export async function readTasks() {
    try{
        const response = await fetch("/api/crud/readTasks.php", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error connecting to server. " + error);
    }
}

// Update task
export async function updateTask(taskData) {
    try{
        const response = await fetch("/api/crud/updateTask.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error connecting to server. " + error);
    }
}

// Delete task
export async function deleteTask(taskId) {
    try{
        const response = await fetch("/api/crud/deleteTask.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: taskId}),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error connecting to server. " + error);
    }
}