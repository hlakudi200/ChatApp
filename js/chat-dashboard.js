let users = JSON.parse(localStorage.getItem('users')) || [];
console.log(users);

function displayUsers() {

    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ' ';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        const imgDiv = document.createElement('div');
        imgDiv.style.width = '30%';
        const img = document.createElement('img');
        img.src = user.userImg || '../assest/images/dafualtimg.jpg'; 
        img.alt = 'profile-pic';
        img.height = 80;
        img.width = 80;
        imgDiv.appendChild(img);

        
        const detailsDiv = document.createElement('div');
        detailsDiv.id = 'details';
        detailsDiv.style.marginBottom = '-2px';

        const name = document.createElement('h2');
        name.id = 'name';
        name.textContent = user.username || 'Unknown User'; 
        detailsDiv.appendChild(name);

        // Create the role element
        const role = document.createElement('p');
        role.style.color = '#DB4A2B';
        role.textContent = user.role || 'No Role'; // Use default role if role is not provided
        detailsDiv.appendChild(role);
         
        //
        const hr=document.createElement('hr');
        hr.style.borderTop='2px solid white';
        hr.style.width='90%'
        // Append the image and details to the user div
        userDiv.appendChild(imgDiv);
        userDiv.appendChild(detailsDiv);
        userContainer.appendChild(userDiv);
        userContainer.appendChild(hr)
    });
}


window.onload = displayUsers;