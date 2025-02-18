document.addEventListener('DOMContentLoaded', function () {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const defaultUsers=[
      {
          username: "Rapudi Hlakudi",
          email: "rapudi@gmail.com",
          password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
          role: "Software Developer",
          userImg: "../assest/images/dafualtimg.jpg"
      },
      {
          username: "Karabo Mokalapa",
          email: "karabo@gmail.com",
          password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
          role: "Project Manager",
          userImg: "../assest/images/dafualtimg.jpg"
      },
      {
          username: "John Snow",
          email: "john@gmail.com",
          password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
          role: "Cybersecurity Expert",
          userImg: "../assest/images/dafualtimg.jpg"
      },
      {
          username: "Donald Macdonald",
          email: "donald@gmail.com",
          password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
          role: "UX Designer",
          userImg: "../assest/images/dafualtimg.jpg"
      },
      {
          username: "Goodwill Nyaku",
          email: "goodwill@gmail.com",
          password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
          role: "Data Scientist",
          userImg: "../assest/images/dafualtimg.jpg"
      }
    ];

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
      const alreadyUsersLoaded=localStorage.getItem('usersLoad');
      if(!alreadyUsersLoaded){
        defaultUsers.forEach(user => {
          users.push(user)
        });
      }
     
      localStorage.setItem('usersLoad','Loaded')
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Sign up was successful!');
      window.location.href = "login.html"; 
    });
  });

  