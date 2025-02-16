
// localStorage.setItem('messages', JSON.stringify([
//     { sender: "Rapudi Hlakudi", receiver: "Karabo Mokalapa", text: "Hey Karabo, how’s the new project coming along?", time: "09:30" },
//     { sender: "Karabo Mokalapa", receiver: "Rapudi Hlakudi", text: "Hey Rapudi! It’s going well, but I might need your help with something.", time: "09:32" },
//     { sender: "John Snow", receiver: "Donald Macdonald", text: "Donald, have you checked the latest security patches?", time: "10:15" },
//     { sender: "Donald Macdonald", receiver: "John Snow", text: "Yes, John. We need to implement some fixes before the next release.", time: "10:17" },
//     { sender: "Goodwill Nyaku", receiver: "Federico Jecha", text: "Federico, let’s discuss the data models for the new feature.", time: "11:00" },
//     { sender: "Federico Jecha", receiver: "Goodwill Nyaku", text: "Sounds good. Let’s meet at 2 PM.", time: "11:05" },
//     { sender: "Kingsman King", receiver: "Rapudi Hlakudi", text: "Rapudi, I just finished the UI mockups. Want to check them out?", time: "12:00" },
//     { sender: "Rapudi Hlakudi", receiver: "Kingsman King", text: "Sure! Send them over.", time: "12:05" },
//     { sender: "Karabo Mokalapa", receiver: "John Snow", text: "John, what’s the latest update on the penetration tests?", time: "13:00" },
//     { sender: "John Snow", receiver: "Karabo Mokalapa", text: "Everything looks secure so far. We’ll do another round next week.", time: "13:05" }
// ]));
// Retrieve data from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];
let activeUser = null; // Track the currently selected chat user

// Get the logged-in user
let currentUser = localStorage.getItem('currentUser');

if (!currentUser) {
    alert("No user logged in!");
    window.location.href = "login.html"; // Redirect to login if no user is logged in
}

// Function to display all users except the logged-in user
function displayUsers() {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Clear existing users

    users.forEach(user => {
        if (user.username === currentUser) return; // Don't display the logged-in user

        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.style.cursor = 'pointer';

        // User profile image
        const imgDiv = document.createElement('div');
        imgDiv.style.width = '30%';
        const img = document.createElement('img');
        img.src = user.userImg || '../assest/images/defaultimg.jpg';
        img.alt = 'profile-pic';
        img.height = '80';
        img.width = '80';
        img.style.borderRadius = '80px';
        imgDiv.appendChild(img);

        // User details
        const detailsDiv = document.createElement('div');
        detailsDiv.id = 'details';
        detailsDiv.style.marginBottom = '-2px';

        const name = document.createElement('h2');
        name.id = 'name';
        name.textContent = user.username;
        detailsDiv.appendChild(name);

        const role = document.createElement('p');
        role.style.color = '#DB4A2B';
        role.textContent = user.role;
        detailsDiv.appendChild(role);

        const hr = document.createElement('hr');
        hr.style.borderTop = '2px solid white';
        hr.style.width = '90%';

        // Append user to container
        userDiv.appendChild(imgDiv);
        userDiv.appendChild(detailsDiv);
        userContainer.appendChild(userDiv);
        userContainer.appendChild(hr);

        // Add click event to load chat
        userDiv.addEventListener('click', function () {
            loadChat(user.username);
        });
    });
}

// Function to load chat for a selected user
function loadChat(selectedUser) {
    activeUser = selectedUser; // Set the currently active chat user
    const chatContainer = document.querySelector('.chats');
    chatContainer.innerHTML = ''; // Clear previous chats

    // Update chat header with selected user
    const chatHeader = document.querySelector('.left-container .user h2');
    chatHeader.textContent = selectedUser;

    // Reload messages from localStorage to ensure we get the latest ones
    messages = JSON.parse(localStorage.getItem('messages')) || [];

    // Filter messages between logged-in user and selected user
    let userMessages = messages.filter(
        msg =>
            (msg.sender === currentUser && msg.receiver === selectedUser) ||
            (msg.sender === selectedUser && msg.receiver === currentUser)
    );

    // Display messages
    userMessages.forEach(chat => {
        const chatDiv = document.createElement('div');
        chatDiv.classList.add(chat.sender === currentUser ? 'sent' : 'received');

        const messageP = document.createElement('p');
        messageP.textContent = chat.text;

        const timeP = document.createElement('p');
        timeP.style.fontWeight = 'bolder';
        timeP.style.color = '#DB4A2B';
        timeP.style.marginBottom = '-7px';
        timeP.textContent = chat.time;

        chatDiv.appendChild(messageP);
        chatDiv.appendChild(timeP);
        chatContainer.appendChild(chatDiv);
    });

    scrollToBottom();
}

// Function to send a new message
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    let messageText = messageInput.value.trim();

    if (!activeUser || messageText === '') {
        alert('Select a user and enter a message.');
        return;
    }

    // Create message object
    let newMessage = {
        sender: currentUser,
        receiver: activeUser,
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Save message to localStorage
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    // Notify other tabs that localStorage has changed
    localStorage.setItem('messageUpdate', Date.now());

    // Update chat immediately
    loadChat(activeUser);

    // Clear input field
    messageInput.value = '';
}

// Function to auto-scroll chat to the bottom
function scrollToBottom() {
    const chatContainer = document.querySelector('.chats');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event listener to send message on "Enter" key
document.getElementById('chat-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Listen for localStorage changes (for real-time chat updates)
window.addEventListener('storage', function (event) {
    if (event.key === 'messageUpdate') {
        // Reload messages in all open tabs
        if (activeUser) {
            loadChat(activeUser);
        }
    }
});

// Load users and initialize on page load
window.onload = displayUsers;

// Sign-out function (Optional)
function signOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}