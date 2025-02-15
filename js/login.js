document.addEventListener('DOMContentLoaded', function () {
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    function hashPassword(password) {
      return CryptoJS.SHA256(password).toString();
    }
  
   
    document.getElementById('signinForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;


      const hashedPassword = hashPassword(password);
      const user = users.find((user) => user.username === username && user.password === hashedPassword);
      if (user) {
        alert("Sign in successful!");
        window.location.href = "chat-dashboard.html"; 
      } else {
        alert("User does not exist or credentials are incorrect.");
      }
    });
  });