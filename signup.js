const url='https://lumor-backend.onrender.com/'
const go=document.getElementById("go");
const emailInput= document.getElementById("email");
const passInput= document.getElementById("pass");
const nameInput= document.getElementById("input");
go.addEventListener("click", ()=>{
    if (!emailCheck("" + emailInput.value)[1]){
        alert(emailCheck(emailInput.value)[0]);
        clear();
    }
    else if (!passCheck(passInput.value)[1]){
        alert(passCheck(passInput.value)[0])
        clear();
    }
    else if (nameInput.value.length ==0){
        alert("Name is required")
        clear();
    }
    else{
        const f=async () => {
            const response= await fetch(url + "signup",{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email: emailInput.value,pass: passInput.value})
            })
            const data= await response.json()   
            console.log(data)
            if (!response.ok){
                if (response.status==404){
                    alert("Incorrect Username or Password")
                }
                else{
                    alert("Login Failed " + response.status);
                }
            }
            else{
                localStorage.setItem('token', data.token)
            }
        }
        f()
    }
})


const emailCheck = (email)=>{
    if (!validateEmail(email)){
        return ["Invalid Email", false];
    }
    return ["valid",true];
}

const clear = ()=>{emailInput.value="";passInput.value="";nameInput.value=""}
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
    if (names.length<5){return ["Password Too Short", false]}
    for (const s of names){
        if (!isNaN(s - 0)){
            reqs[0]=true;
        }
        else if (s.toUpperCase() === s){
            reqs[1]=true;
        }
    }
    if (!reqs[0]){
        return ["Must include a number",false];
    }
    else if (!reqs[1]){
        return ["Must include uppercase letters",false];
    }
    return ["valid",true]
}