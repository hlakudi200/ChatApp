let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Hash password function
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

// Sign-In Form
document.getElementById('signinForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let username = document.getElementById('username').value; 
    let password = document.getElementById('password').value;

    const hashedPassword = hashPassword(password);

    const user = users.find((user) => user.username === username && user.password === hashedPassword);

    if (user) {
        window.location.href = "chat-dashboard.html";
    } else {
        alert("User does not exist or credentials are incorrect.");
    }
});

// Sign-Up Form
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPass = document.getElementById('confirmPass').value;
    let role = document.getElementById("role");
    let option = role.options[role.selectedIndex].value;

    const userExist = users.some(user => user.username === username || user.email === email);
    if (userExist) {
        alert("User already exists.");
        return;
    }

    // Check if passwords match
    if (password.trim() !== confirmPass.trim()) {
        alert("Passwords do not match.");
        return;
    }

    if (option === 'role') {
        alert('Please select a relevant role.');
        return;
    }

    const hashedPassword = hashPassword(password);
    const newUser = {
        username,
        email,
        password: hashedPassword,
        role: option,
        userImg: "https://example.com/profile-image.png",
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up was successful!');
    window.location.href = "login.html";
});