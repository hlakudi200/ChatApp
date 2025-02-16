
localStorage.setItem('users', JSON.stringify([
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
  },
  {
      username: "Federico Jecha",
      email: "federico@gmail.com",
      password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
      role: "Product Manager",
      userImg: "../assest/images/dafualtimg.jpg"
  },
  {
      username: "Kingsman King",
      email: "kingsman@gmail.com",
      password: "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646",
      role: "Software Engineer",
      userImg: "../assest/images/dafualtimg.jpg"
  }
]));
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
        localStorage.setItem('currentUser',username)
        window.location.href = "chat-dashboard.html"; 
      } else {
        alert("User does not exist or credentials are incorrect.");
      }
    });
  });