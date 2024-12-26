document.getElementById("loginForm").addEventListener("submit",function(e){
    e.preventDefault();
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    if(email==="empher@gmail.com" && password==="empher@123"){
        alert("login success,you are redirecting to quiz page");
        window.location.href="quiz.html";
    }else{
        document.getElementById("loginError").textContent="Invalid email or password.";
    }
})