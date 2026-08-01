import { loginUser, signupUser } from "./api/auth/auth.js";

const notice = document.getElementById("notice");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const data = await signupUser({firstName, lastName, email, password, confirmPassword});

        if (data && data.success) {
            window.location.href = "login.html";
        } else if (data) {
            notice.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${data.message}`;
            notice.style.padding = "14px";
        }
    });
}

if(loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = await loginUser({email, password});

        if(data && data.success) {
            window.location.href = "index.html";
        } else if (data) {
            notice.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${data.message}`;
            notice.style.padding = "14px";
        }
    });
}