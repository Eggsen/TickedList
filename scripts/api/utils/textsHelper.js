import { checkSession } from "../auth/authApi.js";

const greeting = document.getElementById("greeting");
const quote = document.getElementById("quote");
const tasksContainer = document.querySelector(".tasks-container");
const taskStatus = document.getElementById("taskStatus");

export async function greet() {
    if (!greeting) return;

    const data = await checkSession();

    if (data && data.logged_in && data.user.first_name) {
        greeting.textContent = `Good day, ${data.user.first_name}!`;
    }
}

export async function generateRandomQuotes() {
    const quotes = [
        {
            quote: "The best way to predict the future is to create it.",
            author: "Peter Drucker"
        },
        {
            quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            quote: "Strive not to be a success, but rather to be of value.",
            author: "Albert Einstein"
        },
        {
            quote: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            quote: "You miss 100% of the shots you don't take.",
            author: "Wayne Gretzky"
        },
        {
            quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
            author: "Ralph Waldo Emerson"
        },
        {
            quote: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            quote: "It is during our darkest moments that we must focus to see the light.",
            author: "Aristotle"
        },
        {
            quote: "I have not failed. I've just found 10,000 ways that won't work.",
            author: "Thomas Edison"
        },
        {
            quote: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        {
            quote: "The only impossible journey is the one you never begin.",
            author: "Tony Robbins"
        },
        {
            quote: "The mind is everything. What you think you become.",
            author: "Buddha"
        },
        {
            quote: "It always seems impossible until it's done.",
            author: "Nelson Mandela"
        },
        {
            quote: "Success is not in what you have, but who you've become.",
            author: "Tony Robbins"
        },
        {
            quote: "It's not whether you get knocked down, it's whether you get up.",
            author: "Vince Lombardi"
        },
        {
            quote: "The journey of a thousand miles begins with a single step.",
            author: "Lao Tzu"
        },
        {
            quote: "What we achieve inwardly will change outer reality.",
            author: "Plutarch"
        }
    ]

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quote.innerHTML = `
        ${randomQuote.quote}
        <span> - ${randomQuote.author}</span>
    `;
}

export async function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";

    document.getElementById("editTitle").value = "No tasks selected.";
    document.getElementById("editDescription").value = "";
    document.getElementById("editDueDate").value = "";
}

export function refreshTasks() {
    tasksContainer.innerHTML = "";
    taskStatus.innerHTML = "";
}

// User profile
export async function displayPersonalInfo() {
    try{
        const firstName = document.getElementById("editFirstName");
        const lastName = document.getElementById("editLastName");
        const email = document.getElementById("editEmail");
        const contactNum = document.getElementById("editContactNum");
        const birthDate = document.getElementById("editBirthDate");

        const data = await checkSession();

        if(data && data.logged_in) {
            firstName.value = data.user.first_name;
            lastName.value = data.user.last_name;
            email.value = data.user.email;
            contactNum.value = data.user.contact_no;
            birthDate.value = data.user.birth_date;
        }
    } catch(error) {
        console.log("Error fetching personal information. " + error);
    }
    
}