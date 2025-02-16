document.addEventListener('DOMContentLoaded', function () {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    
    function hashPassword(password) {
      return CryptoJS.SHA256(password).toString();
    }
  
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
        userImg:"../assest/images/dafualtimg.jpg",
      };
  
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Sign up was successful!');
      window.location.href = "login.html"; 
    });
  });