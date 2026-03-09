let isLogin = true;

const formTitle = document.getElementById("form-title");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const authForm = document.getElementById("authForm");

function toggleForm() {
    isLogin = !isLogin;
    message.textContent = "";

    if (isLogin) {
        formTitle.textContent = "Login";
        emailInput.classList.add("hidden");
        authForm.querySelector("button").textContent = "Login";
        document.getElementById("toggle-text").innerHTML = 'Don\'t have an account? <span onclick="toggleForm()">Register</span>';
    } else {
        formTitle.textContent = "Register";
        emailInput.classList.remove("hidden");
        authForm.querySelector("button").textContent = "Register";
        document.getElementById("toggle-text").innerHTML = 'Already have an account? <span onclick="toggleForm()">Login</span>';
    }
}

authForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = emailInput.value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            message.style.color = "red";
            message.textContent = "Invalid username or password";
        }
    } else {
        if (users.some(u => u.username === username)) {
            message.style.color = "red";
            message.textContent = "Username already exists";
            return;
        }

        users.push({ username, email, password});
        localStorage.setItem("users", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Registration successful! You can now login.";
        toggleForm();
    }
    
    authForm.reset();
});