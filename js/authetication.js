let users =JSON.parse(localStorage.getItem('users')||[]);
let messages=JSON.parse(localStorage.getItem('messages')||[]);
//let users = [];

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
        userImg:"https://www.bing.com/images/search?view=detailV2&ccid=jS5Tpucd&id=A1F12562F0348BCF7384DD20C4F64AF2C9A3A46E&thid=OIP.jS5TpucdX1Y0lo3Nw6lf7wHaHV&mediaurl=https%3A%2F%2Ftableconvert.com%2Fimages%2Favatar.png&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.8d2e53a6e71d5f5634968dcdc3a95fef%3Frik%3DbqSjyfJK9sQg3Q%26pid%3DImgRaw%26r%3D0&exph=500&expw=505&q=profile+image+&form=IRPRST&ck=0C19743DCDBA087BD3CD0F636E240CC2&selectedindex=8&itb=1&ajaxhist=0&ajaxserp=0&pivotparams=insightsToken%3Dccid_hGSCbXlc*cp_A86984B275A5C3378F8F7B2F057B77C4*mid_691239A0BC61FC4E0BDBEBCD1E8132C925837B61*simid_607993209221693249*thid_OIP.hGSCbXlcOjL!_9mmzerqAbQHaHa&vt=0&sim=11&iss=VSI&ajaxhist=0&ajaxserp=0",
    };
    

    users.push(newUser);
    localStorage.setItem('user',JSON.stringify(users))
    saveUserToJson(newUser);
    alert('New sign up was successfull')
    window.location.href = "login.html";
    

});

//sign in users.
document.getElementById('signin-form').addEventListener('submit',function (e){
    e.preventDefault();

    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    //haspassword
    const user=users.find((user)=>{
        user.username===username && user.password===password
    })
   if(user){
    window.location.href = "chat-dashboard.html";  
   }else{
    alert("user does not exist")
   }
});


function saveUserToJson(user){
    let users=[];

    if(localStorage.getItem("users.json")){
        users=JSON.parse(localStorage.getItem("users.json"));
    }

    users.push(user)
    const jsonString=JSON.stringify(user,null,2);
    localStorage.setItem(jsonString,"user.json");
    //downloadJsonData(jsonString,"user.json")
   
}

function downloadJsonData(jsonString,filename){
    const blob =new Blob([jsonString],{type:'application/json;charset=utf-8'});
    const link =document.createElement("a");
    const url=URL.createObjectURL(blob);
    link.setAttribute("href",url);
    link.setAttribute("download",filename)
    link.style.visibility='hidden';
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
}