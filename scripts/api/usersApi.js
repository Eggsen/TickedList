export async function readUsers() {
     try {
         const response = await fetch("/api/user/readUsers.php", {
            method: "GET",
            credentials: "include"
         });

         const data = await response.json();

         return data;
     } catch (error) {
         console.log("Error connecting to server. " + error);
     }
}

export async function updateUserInfo(userInfo) {
    try {
         const response = await fetch("/api/user/updateUserInfo.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
            credentials: "include"
         });

         const data = await response.json();

         return data;
     } catch (error) {
         console.log("Error connecting to server. " + error);
    }
}

export async function updateUserPassword(userPass) {
    try {
         const response = await fetch("/api/user/updateUserPass.php", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userPass),
            credentials: "include"
         });

         const data = await response.json();

         return data;
     } catch (error) {
         console.log("Error connecting to server. " + error);
    }
}

export async function uploadUserPhoto(formData) {
    try {
        const response = await fetch("/api/user/uploadPhoto.php", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error connecting to server. " + error);
    }
}

export async function removeUserPhoto() {
    try {
        const response = await fetch("/api/user/removePhoto.php", {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error connecting to server. " + error);
    }
}