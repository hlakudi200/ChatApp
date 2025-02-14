
const userName=document.getElementById("username");
const email=document.getElementById("email");
const password=document.getElementById("password");
const confirmPass=document.getElementById("confirmPass");
var role=document.getElementById("role");
var option=role.document[role.selectedIndex];
console.log(option)
document.getElementById('sign-up-btn').addEventListener('click',signupUser)
validatePassword(password,confirmPass)

function signupUser(){
    validatePassword(password,confirmPass)
}

//ecryption opbject
var crypt = {
    secret: "CIPHERKEY",
    ecrypt: (clear) => {
        var cipher = CryptoJS.AES.ecrypt(clear, crypt.secret);
        return cipher.toString();
    },
    decrypt: (cipher) => {
        var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
        return decipher.toString(CryptoJS.enc.Utf8);
    }
}


const validatePassword = (password, confirmPass) => {
    if (password.length > 8) {
        console.log("Log");
        if (confirmPass.trim() === password.trim()) {
            //ecrypt password 
            const new_pass = encryptPass(password);
            //sign up user
            signUp(email,userName,new_pass,option);
            return password;
        }else{
            alert("Your passwords do not match.")
        }
    } else {
        alert("Password needs to be longer than 8 characters")
    }
}

//password ecryption
const encryptPass = (pass) => {   
    return crypt.ecrypt(pass);
}
 


const users = [];

const signUp=(email,username,password,role)=>{
    const user={
        username:username,
        email:email,
        password:password,
        role:role,
    }
    if(user){  
        users.push(user);
        alert("Account succesfully registered")
        localStorage.setItem(username,JSON.stringify(user))
        window.location.href("chat-dashboard.html")
    }else{
        alert("could not register user")
    }
    
   localStorage.setItem("allusers",JSON.stringify(users))
}

