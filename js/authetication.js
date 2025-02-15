
let users = [];

document.getElementById('signupForm').addEventListener('submit',function (e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPass = document.getElementById('confirmPass').value;
    let role = document.getElementById("role");
    let option = role.options[role.selectedIndex].value;
    console.log(option)
    
    const userExist=users.some(user=>user.username===username||user.email===email)
    if(userExist){
        alert("user already exists");
        return;
    }
    

    if(password.trim()!==confirmPass.trim()){
        alert("password do not match")
        return;
    }
  
    if(option==='role'){
        alert('Please select a relevent role')
        return; 
    }

    function hashPassword(password){
        const hashedPassword=CryptoJS.SHA256(password).toString();
        return hashedPassword;
    }
    
    const newUser={
        username,
        email,
        password:hashPassword(password),
        option,
        userImg:"",
    };
    

    users.push(newUser);
    localStorage.setItem('user',JSON.stringify(users))
    alert('New sign up was successfull')
    window.location.href = "chat-dashboard.html";
    console.log(users)

});