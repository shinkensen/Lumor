const url='https://lumor-backend.onrender.com/'
const go=document.getElementById("go");
const emailInput= document.getElementById("email");
const passInput= document.getElementById("pass");
const nameInput= document.getElementById("name");
// Yellow backgrounds (primary color) - currently active
const faviconUrls=[
    "https://ui-avatars.com/api/?name=A&background=FFB800&color=fff&size=128&bold=true&rounded=true", // A
    "https://ui-avatars.com/api/?name=B&background=FFB800&color=fff&size=128&bold=true&rounded=true", // B
    "https://ui-avatars.com/api/?name=C&background=FFB800&color=fff&size=128&bold=true&rounded=true", // C
    "https://ui-avatars.com/api/?name=D&background=FFB800&color=fff&size=128&bold=true&rounded=true", // D
    "https://ui-avatars.com/api/?name=E&background=FFB800&color=fff&size=128&bold=true&rounded=true", // E
    "https://ui-avatars.com/api/?name=F&background=FFB800&color=fff&size=128&bold=true&rounded=true", // F
    "https://ui-avatars.com/api/?name=G&background=FFB800&color=fff&size=128&bold=true&rounded=true", // G
    "https://ui-avatars.com/api/?name=H&background=FFB800&color=fff&size=128&bold=true&rounded=true", // H
    "https://ui-avatars.com/api/?name=I&background=FFB800&color=fff&size=128&bold=true&rounded=true", // I
    "https://ui-avatars.com/api/?name=J&background=FFB800&color=fff&size=128&bold=true&rounded=true", // J
    "https://ui-avatars.com/api/?name=K&background=FFB800&color=fff&size=128&bold=true&rounded=true", // K
    "https://ui-avatars.com/api/?name=L&background=FFB800&color=fff&size=128&bold=true&rounded=true", // L
    "https://ui-avatars.com/api/?name=M&background=FFB800&color=fff&size=128&bold=true&rounded=true", // M
    "https://ui-avatars.com/api/?name=N&background=FFB800&color=fff&size=128&bold=true&rounded=true", // N
    "https://ui-avatars.com/api/?name=O&background=FFB800&color=fff&size=128&bold=true&rounded=true", // O
    "https://ui-avatars.com/api/?name=P&background=FFB800&color=fff&size=128&bold=true&rounded=true", // P
    "https://ui-avatars.com/api/?name=Q&background=FFB800&color=fff&size=128&bold=true&rounded=true", // Q
    "https://ui-avatars.com/api/?name=R&background=FFB800&color=fff&size=128&bold=true&rounded=true", // R
    "https://ui-avatars.com/api/?name=S&background=FFB800&color=fff&size=128&bold=true&rounded=true", // S
    "https://ui-avatars.com/api/?name=T&background=FFB800&color=fff&size=128&bold=true&rounded=true", // T
    "https://ui-avatars.com/api/?name=U&background=FFB800&color=fff&size=128&bold=true&rounded=true", // U
    "https://ui-avatars.com/api/?name=V&background=FFB800&color=fff&size=128&bold=true&rounded=true", // V
    "https://ui-avatars.com/api/?name=W&background=FFB800&color=fff&size=128&bold=true&rounded=true", // W
    "https://ui-avatars.com/api/?name=X&background=FFB800&color=fff&size=128&bold=true&rounded=true", // X
    "https://ui-avatars.com/api/?name=Y&background=FFB800&color=fff&size=128&bold=true&rounded=true", // Y
    "https://ui-avatars.com/api/?name=Z&background=FFB800&color=fff&size=128&bold=true&rounded=true"  // Z
]


go.addEventListener("click", ()=>{
    let dots= ['.','..','...']
    let index=0;
    go.disabled= true;
    interval = setInterval(()=>{document.getElementById("text").innerText= "Loading" + dots[index%3];index++;},200)
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
            let url1=faviconUrls[0];
            if (!(nameInput.value.charCodeAt(0)<65||nameInput.value.charCodeAt(0)>122)){
                url1=faviconUrls[nameInput.value.charCodeAt(0)-65];
            }
            const response= await fetch(url + 'signup',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email: emailInput.value, pass: passInput.value, name: nameInput.value, pfp: url1})
            })
            const data= await response.json()   
            console.log(data)
            if (!response.ok){
                if (response.status==500){
                    alert(response.error)
                    clear()
                }
                else{
                    alert("Signup Failed " + response.status);
                    clear()
                }
            }
            else{
                localStorage.setItem('token', data.token)
                window.location.href = 'login.html';
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