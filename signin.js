const url='https://lumor-backend.onrender.com/'
const go=document.getElementById("go");
const emailInput= document.getElementById("email");
const passInput= document.getElementById("pass");
let interval;
go.addEventListener("click", ()=>{
    let dots= ['.','..','...']
    let index=0;
    go.disabled= true;
    interval = setInterval(()=>{document.getElementById("text").innerText= "Loading" + dots[index%3];index++;},200)
    if (!emailCheck(emailInput.value)){
        alert("Incorrect Username or Password");
        clear();
    }
    else if (!passCheck(passInput.value)){
        alert("Incorrect Username or Password")
        clear();
    }
    else{
        const f=async () => {
            const response= await fetch(url + "login",{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email: emailInput.value,pass: passInput.value})
            })
            const data= await response.json();
            console.log(data)
            if (!response.ok){
                if (response.status==404){
                    alert("Incorrect Username or Password")
                    clear()
                }
                else{
                    alert("Login Failed " + response.status);
                    clear()
                }
            }
            else{
                localStorage.setItem('token', data.token)
                clear()
                window.location.href = 'dashboard.html'
            }
        }
        f()
    }
})


const emailCheck = (email)=>{
    if (!validateEmail(email)){
        return  false;
    }
    return  true;
}
const clear = ()=>{
    emailInput.value="";
    passInput.value="";
    clearInterval(interval);
    document.getElementById("text").innerText= "Go";
    go.disabled =false;
}
const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
const passCheck = (name)=>{
    const reqs= [false,false];
    const names= name.split("");
    if (names.length<5){return false}
    for (const s of names){
        if (!isNaN(s - 0)){
            reqs[0]=true;
        }
        else if (s.toUpperCase() === s){
            reqs[1]=true;
        }
    }
    if (!reqs[0]){
        return false;
    }
    else if (!reqs[1]){
        return false;
    }
    return true;
}