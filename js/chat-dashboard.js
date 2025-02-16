let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];
let activeRole = null;
let activeUSerName=null;
let activeImage=null;
let currentUser = localStorage.getItem('currentUser');

if (!currentUser) {
    alert("No user logged in!");
    window.location.href = "login.html";
}


function displayUsers() {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = '';
    const groupChatDiv = document.createElement('div');
    groupChatDiv.classList.add('user');
    groupChatDiv.style.cursor = 'pointer';

    const imgDiv = document.createElement('div');
    imgDiv.style.width = '30%';
    const img = document.createElement('img');
    img.src = '../assest/images/groupchat.jpg'; 
    img.alt = 'group-chat';
    img.height = '80';
    img.width = '80';
    img.style.borderRadius = '80px';
    imgDiv.appendChild(img);

    const detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';
    const name = document.createElement('h3');
    name.style.color = '#7C7070'; 
    name.textContent = "Group Chat";
    detailsDiv.appendChild(name);
    const hr = document.createElement('hr');
    hr.style.borderTop = '2px solid white';
    hr.style.width = '90%';
    groupChatDiv.appendChild(imgDiv);
    groupChatDiv.appendChild(detailsDiv);
    userContainer.appendChild(groupChatDiv);
    userContainer.appendChild(hr);

    groupChatDiv.addEventListener('click', function () {
        loadChat("Group Chat","GroupChat","../assest/images/groupchat.jpg");
    });

    users.forEach(user => {
        if (user.username === currentUser) return;

        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.style.cursor = 'pointer';

        const imgDiv = document.createElement('div');
        imgDiv.style.width = '30%';
        const img = document.createElement('img');
        img.src = user.userImg || '../assest/images/defaultimg.jpg';
        img.alt = 'profile-pic';
        img.height = '80';
        img.width = '80';
        img.style.borderRadius = '80px';
        imgDiv.appendChild(img);

        const detailsDiv = document.createElement('div');
        detailsDiv.id = 'details';
        
        const name = document.createElement('h3');
        name.style.color = '#7C7070'; 
        name.textContent = user.username;
        detailsDiv.appendChild(name);
        const role = document.createElement('p');
        role.style.color = '#DB4A2B'; 
        role.textContent = user.role;
        detailsDiv.appendChild(role);

        const hr = document.createElement('hr');
        hr.style.borderTop = '2px solid white';
        hr.style.width = '90%';

        userDiv.appendChild(imgDiv);
        userDiv.appendChild(detailsDiv);
        userContainer.appendChild(userDiv);
        userContainer.appendChild(hr);

        userDiv.addEventListener('click', function () {
            loadChat(user.username,user.role,user.userImg);
        });
    });
}


function isMobile() {
    return window.innerWidth <= 767;
}

if (isMobile()) {
    console.log("This is a mobile device.");
} else {
    console.log("This is not a mobile device.");
}
function backnBtn(){
    window.location.href="chat-dashboard.html";
}
function loadChat(selectedUser,user_role,userImage) {
     if(isMobile()){
        console.log("we are on mobile")
        const chatContainer=document.getElementById("chatContainer");
        const userContainer=document.getElementById("userContainer");
        const backnBtn=document.getElementById("back-button");
        backnBtn.style.display='block';
        chatContainer.style.display='block';
        userContainer.style.display='none';    
     }
    activeUser = selectedUser;
    activeImage=userImage;
    activeRole=user_role;
    const chatContainer = document.querySelector('.chats');
    chatContainer.innerHTML = '';

    const chatHeader = document.querySelector('.left-container .user h2');
    chatHeader.textContent = selectedUser;
     
    const userRole=document.querySelector('.left-container .user p');
    userRole.textContent=user_role;
    const userImg=document.querySelector('.left-container .user img');
    userImg.src=userImage;
    
    messages = JSON.parse(localStorage.getItem('messages')) || [];

    let userMessages;
    if (selectedUser === "Group Chat") {
        userMessages = messages.filter(msg => msg.receiver === "Group Chat");
    } else {
        userMessages = messages.filter(
            msg =>
                (msg.sender === currentUser && msg.receiver === selectedUser) ||
                (msg.sender === selectedUser && msg.receiver === currentUser)
        );
    }

    userMessages.forEach(chat => {
        const chatDiv = document.createElement('div');
        chatDiv.classList.add(chat.sender === currentUser ? 'sent' : 'received');

        const messageP = document.createElement('p');
        messageP.textContent = (selectedUser === "Group Chat") 
            ? `${chat.sender}: ${chat.text} ` 
            : chat.text; 

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

function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    let messageText = messageInput.value.trim();

    if (!activeUser || messageText === '') {
        alert('Select a user and enter a message.');
        return;
    }

    let newMessage = {
        sender: currentUser,
        receiver: activeUser, 
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    localStorage.setItem('messageUpdate', Date.now()); 

    loadChat(activeUser,activeRole,activeImage);

    messageInput.value = '';
}

function scrollToBottom() {
    const chatContainer = document.querySelector('.chats');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById('chat-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

window.addEventListener('storage', function (event) {
    if (event.key === 'messageUpdate') {
        if (activeUser) {
            loadChat(activeUser);
        }
    }
});

window.onload = displayUsers;


function signOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

