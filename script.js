// Generate a strong password
function generatePassword() {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Update the password strength meter
function updateStrengthMeter(password) {
    const meterFill = document.getElementById("strength-meter-fill");
    const strength = calculateStrength(password);

    meterFill.className = "strength-meter-fill"; // Reset classes
    if (strength <= 25) {
        meterFill.classList.add("weak");
    } else if (strength <= 50) {
        meterFill.classList.add("medium");
    } else if (strength <= 75) {
        meterFill.classList.add("strong");
    } else {
        meterFill.classList.add("very-strong");
    }
}

// Calculate password strength (simple implementation)
function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 25;
    return strength;
}

// Event listener for the Generate Password button
document.getElementById("generate-password-btn").addEventListener("click", () => {
    const generatedPassword = generatePassword();
    document.getElementById("generated-password").value = generatedPassword;
    updateStrengthMeter(generatedPassword);
});

// Event listener for the password input field
document.getElementById("password").addEventListener("input", (event) => {
    updateStrengthMeter(event.target.value);
});
// Copy Password
document.getElementById("copy-btn").addEventListener("click", function () {
    const passwordField = document.getElementById("generated-password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
});
// Password Manager
const form = document.getElementById("password-form");
const passwordList = document.getElementById("password-list");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create a new row
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${website}</td>
        <td>${username}</td>
        <td>${password}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    passwordList.appendChild(row);

    // Reset form
    form.reset();
});
// Delete Password Entry
passwordList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.parentElement.remove();
    }
});