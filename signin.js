const go=document.getElementById("go");
const userInput= document.getElementById("user");
const passInput= document.getElementById("pass");

go.addEventListener("click", ()=>{
    if (!usernameCheck("" + userInput.value)[1]){
        alert(usernameCheck(userInput.value)[0]);
    }
    else{

    }
})








const usernameCheck = (name)=>{
    if (name.length < 6){
        return ["Username too short", false];
    }
    if (!isNaN(name.charAt(0) -0)){
        return ["Cannot start with number", false]
    }
    return ["valid",true];
}


const passCheck = (name)=>{
    const reqs= [false,false,false]
    const names= name.split("");
    for (const s of names){
        if (s - 0!=undefined){}
    }
}