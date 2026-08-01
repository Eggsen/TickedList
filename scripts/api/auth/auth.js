export async function signupUser(userCredentials) {
    try{
        const response = await fetch("/api/auth/signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error communicating with the database." + error);
    }
}

export async function loginUser(userCredentials) {
    try{
        const response = await fetch("/api/auth/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials),
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log("Error communicating with the database." + error);
    }
}