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