import {createClient} from 'https://esm.sh/@supabase/supabase-js';
const supabase= createClient("https://rsaquxvrhyudikhkviti.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzYXF1eHZyaHl1ZGlraGt2aXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTM3MzMsImV4cCI6MjA3NjgyOTczM30.py5-5y8MO4foxXPHvwzgHKlW2Q0PIqQ2ktGwIPRwEWs")



async function signUp(email,pass) {
    const {data,error} = await supabase.auth.signInWithPassword({
        email: email, password: pass
    })
    if (error){
        return [false, error.message];
    }
    else{
    }
}


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
    if (names.length<6){
        reqs[2]=true;
    }
    for (const s of names){
        if (s - 0!=undefined){
            reqs[0]=true
        }
        if (s.toUpperCase() == s ){
            reqs[1] = true
        }
    }
    if (reqs[0]&&reqs[1] && reqs[2]){return ["valid",true]}
    if (!reqs[2]){
        return ["Password Too Short"];
    }
    if (!reqs[0]){
        return ["At least one number required", false];
    }
    return ["Uppercase letter required"];
}