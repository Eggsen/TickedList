export async function updateProfile(userData) {
    try{
        const response = await fetch("/api/crud/profile/updateProfile.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error connecting to server. " + error);
    }
}

export async function updatePassword(password) {
    try{
        const response = await fetch("/api/crud/profile/updatePassword.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(password),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error connecting to server. " + error);
    }
}